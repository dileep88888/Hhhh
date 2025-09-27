// Product data
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 999,
        category: "smartphones",
        image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Latest iPhone with advanced camera system and A17 Pro chip"
    },
    {
        id: 2,
        name: "MacBook Pro 16\"",
        price: 2499,
        category: "laptops",
        image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
        description: "Powerful laptop for professionals with M3 Max chip"
    },
    {
        id: 3,
        name: "AirPods Pro",
        price: 249,
        category: "headphones",
        image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Premium wireless earbuds with active noise cancellation"
    },
    {
        id: 4,
        name: "Samsung Galaxy S24",
        price: 899,
        category: "smartphones",
        image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Flagship Android phone with AI-powered features"
    },
    {
        id: 5,
        name: "Dell XPS 13",
        price: 1299,
        category: "laptops",
        image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Ultra-portable laptop with stunning InfinityEdge display"
    },
    {
        id: 6,
        name: "Sony WH-1000XM5",
        price: 399,
        category: "headphones",
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Industry-leading noise canceling headphones"
    },
    {
        id: 7,
        name: "iPad Pro 12.9\"",
        price: 1099,
        category: "accessories",
        image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Professional tablet with M2 chip and Liquid Retina display"
    },
    {
        id: 8,
        name: "Apple Watch Series 9",
        price: 399,
        category: "accessories",
        image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Advanced smartwatch with health monitoring features"
    },
    {
        id: 9,
        name: "Google Pixel 8 Pro",
        price: 999,
        category: "smartphones",
        image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "AI-powered photography and pure Android experience"
    },
    {
        id: 10,
        name: "Surface Laptop 5",
        price: 1599,
        category: "laptops",
        image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400",
        description: "Sleek Windows laptop with premium design and performance"
    },
    {
        id: 11,
        name: "Bose QuietComfort 45",
        price: 329,
        category: "headphones",
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Comfortable over-ear headphones with excellent noise cancellation"
    },
    {
        id: 12,
        name: "MagSafe Charger",
        price: 39,
        category: "accessories",
        image: "https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Wireless charging pad for iPhone with magnetic alignment"
    }
];

// Shopping cart
let cart = [];
let currentFilter = 'all';

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    updateCartUI();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
});

// Display products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter and display products
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showCartNotification();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
}

// Show cart notification
function showCartNotification() {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1002;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = '<i class="fas fa-check"></i> Added to cart!';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Total: $${total.toFixed(2)}\n\nThis is a demo checkout. In a real store, you would be redirected to a payment processor.`);
    
    // Clear cart
    cart = [];
    updateCartUI();
    toggleCart();
}

// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = ['home', 'products', 'about', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                current = section;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);