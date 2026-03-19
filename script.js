document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Nav
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn.addEventListener('click', () => mobileNav.classList.add('active'));
    closeMenuBtn.addEventListener('click', () => mobileNav.classList.remove('active'));
    mobileLinks.forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('active')));

    // 2. Data Categories
    const categoriesList = [
        { name: "Frames", image: products.find(p => p.category === "Frames")?.image || "" },
        { name: "Resin Arts", image: products.find(p => p.category === "Resin Arts")?.image || "" },
        { name: "Wall Clocks", image: products.find(p => p.category === "Wall Clocks")?.image || "" },
        { name: "Artificial Flowers", image: products.find(p => p.category === "Artificial Flowers & Leafs")?.image || "" }
    ];

    // Phone Number for WhatsApp
    const WA_NUMBER = "919037010474";

    // Utility: Create Product Card HTML
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        
        // Auto message construct
        const waMessage = `Hi, I want this product (${product.id}) - ${product.name}`;
        const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <button class="fav-btn" aria-label="Add to favorites">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
            </div>
            <div class="product-info">
                <div class="product-header">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-price">${product.price}</span>
                </div>
                <div class="product-cat">${product.category}</div>
                <a href="${waLink}" target="_blank" class="product-order-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    Order on WhatsApp
                </a>
            </div>
        `;

        // Handle Favorite Toggle
        const favBtn = card.querySelector('.fav-btn');
        favBtn.addEventListener('click', (e) => {
            e.preventDefault();
            favBtn.classList.toggle('active');
            // Toggle fill color for heart
            const svg = favBtn.querySelector('svg');
            if(favBtn.classList.contains('active')) {
                svg.setAttribute('fill', 'currentColor');
            } else {
                svg.setAttribute('fill', 'none');
            }
        });

        return card;
    }

    // 3. Render Featured (First 4 items as requested)
    function renderFeatured() {
        const featuredGrid = document.getElementById('featuredGrid');
        if (!featuredGrid) return;
        
        // Take 4 distinctive premium products
        const featuredProducts = [ products[0], products[3], products[15], products[22] ];
        featuredProducts.forEach(prod => {
            if(prod) featuredGrid.appendChild(createProductCard(prod));
        });
    }

    // 4. Render Categories
    function renderCategories() {
        const categoryGrid = document.getElementById('categoryGrid');
        if (!categoryGrid) return;

        categoriesList.forEach(cat => {
            const card = document.createElement('a');
            card.href = "#all-products"; // Scrolling down to products simply
            card.className = 'category-card';
            card.innerHTML = `
                <div class="category-icon">
                    <img src="${cat.image}" alt="${cat.name}">
                </div>
                <h3>${cat.name}</h3>
            `;
            categoryGrid.appendChild(card);
        });
    }

    // 5. Render All Products
    function renderAllProducts() {
        const allProductsGrid = document.getElementById('allProductsGrid');
        if (!allProductsGrid) return;

        products.forEach(prod => {
            allProductsGrid.appendChild(createProductCard(prod));
        });
    }

    renderFeatured();
    renderCategories();
    renderAllProducts();

    // 6. Contact Form EmailJS
    const EMAILJS_PUBLIC_KEY = "maFV8byy4oafFi6Jv";
    const EMAILJS_SERVICE_ID = "service_fkcdjj2";
    const EMAILJS_TEMPLATE_ID = "template_f8l8yxa";

    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            
            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
                .then(() => {
                    submitBtn.textContent = 'Message Sent!';
                    this.reset();
                    setTimeout(() => submitBtn.textContent = originalText, 3000);
                }, (error) => {
                    console.error('EmailJS Error:', error);
                    alert('Failed to send message. Error: ' + (error.text || error.message || JSON.stringify(error)));
                    submitBtn.textContent = originalText;
                });
        });
    }
});
