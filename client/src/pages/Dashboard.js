import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showCart, setShowCart] = useState(false);
  const [products, setProducts] = useState({ tops: [], bottoms: [], shoes: [] });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    // Load products from database
    loadProducts();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      
      // Group products by category
      const groupedProducts = {
        tops: response.data.products.filter(p => p.category === 'tops'),
        bottoms: response.data.products.filter(p => p.category === 'bottoms'),
        shoes: response.data.products.filter(p => p.category === 'shoes')
      };
      
      setProducts(groupedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to load products from database');
      
      // Fallback to static products if database fails
      setProducts({
        tops: [
          { id: 1, name: 'Premium Cotton T-Shirt', price: 29.99, rating: 4.8, reviews: 156, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop&crop=center', category: 'tops', brand: 'EcoWear' },
          { id: 2, name: 'Vintage Denim Jacket', price: 89.99, rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=400&fit=crop&crop=center', category: 'tops', brand: 'RetroStyle' },
          { id: 3, name: 'Casual Hoodie', price: 49.99, rating: 4.7, reviews: 203, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop&crop=center', category: 'tops', brand: 'ComfortZone' },
          { id: 4, name: 'Elegant Blouse', price: 39.99, rating: 4.6, reviews: 124, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop&crop=center', category: 'tops', brand: 'ChicStyle' },
          { id: 5, name: 'Sports Tank Top', price: 24.99, rating: 4.5, reviews: 78, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=400&fit=crop&crop=center', category: 'tops', brand: 'ActiveLife' }
        ],
        bottoms: [
          { id: 6, name: 'Classic Blue Jeans', price: 69.99, rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=400&fit=crop&crop=center', category: 'bottoms', brand: 'DenimCo' },
          { id: 7, name: 'Chino Pants', price: 54.99, rating: 4.7, reviews: 189, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop&crop=center', category: 'bottoms', brand: 'SmartCasual' },
          { id: 8, name: 'Athletic Shorts', price: 34.99, rating: 4.6, reviews: 267, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=400&fit=crop&crop=center', category: 'bottoms', brand: 'SportsFlex' },
          { id: 9, name: 'Formal Trousers', price: 79.99, rating: 4.9, reviews: 145, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop&crop=center', category: 'bottoms', brand: 'BusinessPro' },
          { id: 10, name: 'Cargo Pants', price: 59.99, rating: 4.4, reviews: 98, image: 'https://images.unsplash.com/photo-1506629905607-37d56ac5b0e3?w=300&h=400&fit=crop&crop=center', category: 'bottoms', brand: 'UtilityWear' }
        ],
        shoes: [
          { id: 11, name: 'Running Sneakers', price: 119.99, rating: 4.9, reviews: 445, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop&crop=center', category: 'shoes', brand: 'RunFast' },
          { id: 12, name: 'Leather Boots', price: 149.99, rating: 4.8, reviews: 167, image: 'https://images.unsplash.com/photo-1608256246200-53e8b47b9558?w=300&h=400&fit=crop&crop=center', category: 'shoes', brand: 'CraftLeather' },
          { id: 13, name: 'Canvas Shoes', price: 64.99, rating: 4.6, reviews: 289, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&h=400&fit=crop&crop=center', category: 'shoes', brand: 'CasualStep' },
          { id: 14, name: 'Formal Oxfords', price: 129.99, rating: 4.7, reviews: 134, image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=300&h=400&fit=crop&crop=center', category: 'shoes', brand: 'EliteShoes' },
          { id: 15, name: 'Casual Loafers', price: 89.99, rating: 4.5, reviews: 76, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=400&fit=crop&crop=center', category: 'shoes', brand: 'ComfortWalk' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const addProductToCategory = async (category) => {
    try {
      setLoading(true);
      setError('');
      setMessage('');

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to add products');
        return;
      }

      // Simple form UI for adding products
      const formHtml = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
          <div style="background: white; padding: 20px; border-radius: 8px; width: 400px; max-width: 90vw;">
        <h3>Add New ${category.charAt(0).toUpperCase() + category.slice(1, -1)}</h3>
        <form id="addProductForm">
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Product Name:</label>
            <input type="text" name="name" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Price:</label>
            <input type="number" name="price" step="0.01" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Brand:</label>
            <input type="text" name="brand" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          </div>
          <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px;">Image URL:</label>
            <input type="url" name="image" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;" />
          </div>
          <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <button type="button" onclick="document.body.removeChild(this.closest('div').parentElement)" style="padding: 8px 16px; background: #ccc; border: none; border-radius: 4px; cursor: pointer;">Cancel</button>
            <button type="submit" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Add Product</button>
          </div>
        </form>
          </div>
        </div>
      `;

      // Create and append the form
      const formContainer = document.createElement('div');
      formContainer.innerHTML = formHtml;
      document.body.appendChild(formContainer);

      // Handle form submission
      const form = document.getElementById('addProductForm');
      form.onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const productData = {
          name: formData.get('name'),
          price: parseFloat(formData.get('price')),
          brand: formData.get('brand'),
          image: formData.get('image'),
          category: category,
          rating: 4.5,
          reviews: 0
        };


        try {
          const response = await axios.post('/', productData, {
        headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.data.success) {
        setMessage(`${category.slice(0, -1)} added successfully!`);
        loadProducts(); // Reload products
        document.body.removeChild(formContainer);
          }
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to add product');
        }
      };
      

      

    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.response?.data?.message || 'Failed to add product');
      
      // Clear error after 5 seconds
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product, event) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    // Show a brief animation or notification
    const button = event?.target;
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    }
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => 
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getFilteredProducts = () => {
    let allProducts = Object.values(products).flat();
    
    // Filter by search term
    if (searchTerm) {
      allProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      allProducts = allProducts.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    allProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    return allProducts;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (hasHalfStar) {
      stars += '☆';
    }
    while (stars.length < 5) {
      stars += '☆';
    }
    
    return stars;
  };

  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-overlay">
          <button 
            className="add-to-cart-btn"
            onClick={(e) => addToCart(product, e)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="product-info">
        <h4 className="product-name">{product.name}</h4>
        <p className="product-brand">{product.brand}</p>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span className="rating-text">({product.reviews})</span>
        </div>
        <div className="product-price">${product.price}</div>
      </div>
    </div>
  );

  const CartModal = () => (
    <div className={`cart-modal ${showCart ? 'show' : ''}`}>
      <div className="cart-modal-content">
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="close-cart" onClick={() => setShowCart(false)}>×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                </div>
                <div className="cart-item-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">Total: ${getTotalPrice().toFixed(2)}</div>
            <button className="checkout-btn">Checkout</button>
          </div>
        )}
      </div>
    </div>
  );

  const FilterControls = () => (
    <div className="filter-controls">
      <div className="filter-group">
        <label>Category:</label>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Categories</option>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Sort by:</label>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );

  const CategorySection = ({ title, products, icon, category }) => (
    <div className="category-section">
      <div className="category-header">
        <h3 className="category-title">
          <span className="category-icon">{icon}</span>
          {title}
        </h3>
        <div className="category-actions">
          <button 
            className="add-product-btn" 
            onClick={() => addProductToCategory(category)}
            disabled={loading}
            title={`Add new ${category.slice(0, -1)} to database`}
          >
            {loading ? '⏳' : '➕'} Add {title.slice(0, -1)}
          </button>
          <button className="view-all-link" onClick={() => console.log(`View all ${title}`)}>
            View All →
          </button>
        </div>
      </div>
      <div className="products-scroll-container">
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );

  const SearchResults = () => {
    const filteredProducts = getFilteredProducts();
    
    if (searchTerm && filteredProducts.length === 0) {
      return (
        <div className="search-results">
          <h3>No results found for "{searchTerm}"</h3>
          <p>Try searching with different keywords or browse our categories below.</p>
        </div>
      );
    }
    
    if (searchTerm || selectedCategory !== 'all') {
      return (
        <div className="search-results">
          <div className="results-header">
            <h3>
              {searchTerm ? `Search results for "${searchTerm}"` : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
              <span className="results-count">({filteredProducts.length} items)</span>
            </h3>
            <FilterControls />
          </div>
          <div className="products-scroll-container">
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="ecommerce-dashboard">
      <CartModal />
      
      {/* Notification Messages */}
      {message && (
        <div className="notification success-notification">
          <span>{message}</span>
          <button onClick={() => setMessage('')}>×</button>
        </div>
      )}
      {error && (
        <div className="notification error-notification">
          <span>{error}</span>
          <button onClick={() => setError('')}>×</button>
        </div>
      )}
      
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name || 'User'}!</h1>
          <p>Discover amazing products curated just for you</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="cart-summary" onClick={() => setShowCart(true)}>
            <div className="cart-icon">
              🛒
              {getTotalItems() > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </div>
            <span className="cart-total">${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {(searchTerm || selectedCategory !== 'all') ? (
        <SearchResults />
      ) : (
        <>
          <div className="hero-banner">
            <div className="hero-content">
              <h2>Summer Collection 2024</h2>
              <p>Explore the latest trends and exclusive deals</p>
              <button className="hero-cta">Shop Now</button>
            </div>
          </div>

          <div className="categories-container">
            <CategorySection 
              title="Tops" 
              products={products.tops} 
              icon="👕"
              category="tops"
            />
            <CategorySection 
              title="Bottoms" 
              products={products.bottoms} 
              icon="👖"
              category="bottoms"
            />
            <CategorySection 
              title="Shoes" 
              products={products.shoes} 
              icon="👟"
              category="shoes"
            />
          </div>
        </>
      )}

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{Object.values(products).flat().length}</p>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <p>3</p>
        </div>
        <div className="stat-card">
          <h3>Cart Items</h3>
          <p>{getTotalItems()}</p>
        </div>
        <div className="stat-card">
          <h3>Cart Total</h3>
          <p>${getTotalPrice().toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
