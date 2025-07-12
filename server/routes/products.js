const express = require('express');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, search, sortBy = 'name', page = 1, limit = 20 } = req.query;
    
    let query = {};
    
    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Sorting
    let sort = {};
    switch (sortBy) {
      case 'price-low':
        sort = { price: 1 };
        break;
      case 'price-high':
        sort = { price: -1 };
        break;
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'newest':
        sort = { createdAt: -1 };
        break;
      default:
        sort = { name: 1 };
    }
    
    const products = await Product.find(query)
      .populate('createdBy', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    
    const total = await Product.countDocuments(query);
    
    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({ message: 'Server error while fetching products by category' });
  }
});

// Add a new product (protected route)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, brand, price, category, image, description } = req.body;
    
    // Validation
    if (!name || !brand || !price || !category || !image) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: name, brand, price, category, image' 
      });
    }
    
    if (!['tops', 'bottoms', 'shoes'].includes(category)) {
      return res.status(400).json({ 
        message: 'Category must be one of: tops, bottoms, shoes' 
      });
    }
    
    if (price < 0) {
      return res.status(400).json({ 
        message: 'Price must be a positive number' 
      });
    }
    
    // Create new product
    const newProduct = new Product({
      name,
      brand,
      price: parseFloat(price),
      category,
      image,
      description: description || '',
      createdBy: req.user.id,
      rating, // Random rating between 4.0-5.0
      reviews,// Random reviews between 50-550
    });
    
    const savedProduct = await newProduct.save();
    await savedProduct.populate('createdBy', 'name email');
    
    res.status(201).json({
      message: 'Product added successfully',
      product: savedProduct
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ message: 'Server error while adding product' });
  }
});

// Update a product (protected route)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Find the product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if user owns the product or is admin (for now, any authenticated user can update)
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');
    
    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
});

// Delete a product (protected route)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if user owns the product
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }
    
    await Product.findByIdAndDelete(id);
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
});

// Get quick add templates for each category
router.get('/templates/:category', authMiddleware, async (req, res) => {
  try {
    const { category } = req.params;
    

    
    
    // if (!templates[category]) {
    //   return res.status(400).json({ message: 'Invalid category' });
    // }
    
    // res.json(templates[category]);
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ message: 'Server error while fetching templates' });
  }
});

module.exports = router;
