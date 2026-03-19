document.addEventListener("DOMContentLoaded", () => {
    
    // Elements
    const grid = document.getElementById('catalogGrid');
    const categoryGrid = document.getElementById('categoryGrid');
    const catalogDivider = document.getElementById('catalogDivider');
    const searchInput = document.getElementById('searchInput');

    // Modal Elements
    const productModal = document.getElementById('productModal');
    const closeModal = document.getElementById('closeModal');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalDesc = document.getElementById('modalDesc');
    const modalColors = document.getElementById('modalColors');
    const modalWaBtn = document.getElementById('modalWaBtn');

    // Phone Number for WhatsApp orders
    const WA_NUMBER = "919037010474";

    // State
    let searchQuery = '';

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    if (slides.length > 0) {
        nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => { showSlide(i); resetInterval(); });
        });

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
        resetInterval();
    }

    // Defined 12 Categories
    const categories = [
        "Frames",
        "Artificial Flowers & Leafs",
        "Resin Arts",
        "Wall Clocks",
        "Ceramic Flower Vases & Glass Vases",
        "Metal Arts",
        "Soap Dispensers",
        "Under Table Rug",
        "Wall Furnitures",
        "Customised Mirrors",
        "Table Mate",
        "Crockerys Decor Set"
    ];

    // Map an image string to each category based on first available product
    function getCategoryImage(categoryName) {
        const prod = products.find(p => p.category === categoryName);
        return prod ? prod.image : 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=800'; // Default fallback
    }

    // Render the Top-Level Category Grid
    function renderCategoryGrid() {
        if (!categoryGrid) return;
        categoryGrid.innerHTML = '';

        categories.forEach((category) => {
            const card = document.createElement('a');
            // When clicked, smooth scroll to the catalog and filter it
            card.href = "#catalogDivider"; 
            card.className = 'category-card';
            card.innerHTML = `
                <div class="category-image-wrapper">
                    <img src="${getCategoryImage(category)}" alt="${category}">
                </div>
                <h3>${category}</h3>
            `;

            // Click Event to Filter Catalog
            card.addEventListener('click', (e) => {
                e.preventDefault();
                searchQuery = ''; // Clear search
                if (searchInput) searchInput.value = '';
                
                // Set explicitly strictly to this one category
                renderSpecificCategory(category);
                
                // Show divider and scroll
                if(catalogDivider) catalogDivider.style.display = 'block';
                catalogDivider.scrollIntoView({ behavior: 'smooth' });
            });

            categoryGrid.appendChild(card);
        });
    }

    // Function to render products (handles search and default specific category rendering)
    function renderSpecificCategory(specificCategory) {
        grid.innerHTML = ''; // Clear main container
        
        const categoryProducts = products.filter(p => p.category === specificCategory);
        
        if (categoryProducts.length > 0) {
            const sectionContainer = document.createElement('div');
            sectionContainer.className = 'category-section fade-up';
            
            const sectionTitle = document.createElement('h3');
            sectionTitle.textContent = specificCategory;
            sectionTitle.style.fontSize = '2rem';
            sectionTitle.style.marginBottom = '2rem';
            sectionTitle.style.borderBottom = '1px solid #E0E0E0';
            sectionTitle.style.paddingBottom = '0.5rem';
            
            const sectionGrid = document.createElement('div');
            sectionGrid.className = 'catalog-grid';
            
            sectionContainer.appendChild(sectionTitle);
            sectionContainer.appendChild(sectionGrid);
            grid.appendChild(sectionContainer);
            
            renderGrid(categoryProducts, null, sectionGrid);
            setTimeout(initScrollAnimations, 50);
        }
    }

    // Function to render products (handles search)
    function renderProducts() {
        grid.innerHTML = ''; // Clear main container
        if (catalogDivider) catalogDivider.style.display = 'none'; // hide divider on top-level view

        // If searching, just show a flat list
        if (searchQuery) {
            if (catalogDivider) catalogDivider.style.display = 'block'; // show divider
            
            const lowerQuery = searchQuery.toLowerCase();
            const filteredProducts = products.filter(p => 
                p.name.toLowerCase().includes(lowerQuery) || 
                p.category.toLowerCase().includes(lowerQuery) ||
                p.id.toLowerCase().includes(lowerQuery)
            );

            if (filteredProducts.length === 0) {
                grid.innerHTML = '<p class="no-results" style="grid-column: 1 / -1; text-align: center; color: #888;">No products found matching your search.</p>';
                return;
            }

            renderGrid(filteredProducts, "Search Results", grid);
            setTimeout(initScrollAnimations, 50);
            return;
        }

        // If no search, we initially leave the product grid empty. 
        // Products only show when a category box is clicked or searched.
    }

    // Helper to render a specific grid
    function renderGrid(productArray, title, container) {
        if (title) {
            const h3 = document.createElement('h3');
            h3.textContent = title;
            h3.style.fontSize = '2rem';
            h3.style.marginBottom = '2rem';
            h3.style.gridColumn = '1 / -1';
            container.appendChild(h3);
        }

        productArray.forEach((product, index) => {
            const card = document.createElement('div');
            card.className = `product-card fade-up delay-${(index % 3) + 1}`;
            
            card.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                </div>
                <div class="product-info">
                    <div>
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-details">${product.colors.join(', ')} | ID: ${product.id}</div>
                    </div>
                    <div class="product-price">${product.price}</div>
                </div>
            `;
            
            // Add click event to open Modal
            card.addEventListener('click', () => openProductModal(product));
            
            grid.appendChild(card);
        });
    }

    // Modal Logic
    function openProductModal(product) {
        if (!productModal) return;
        
        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalCategory.textContent = product.category;
        modalTitle.textContent = product.name;
        modalPrice.textContent = product.price;
        modalDesc.textContent = product.description;
        
        // Colors
        modalColors.innerHTML = '';
        product.colors.forEach(color => {
            const tag = document.createElement('span');
            tag.className = 'color-tag';
            tag.textContent = color;
            modalColors.appendChild(tag);
        });
        
        // WhatsApp Link formulation
        const message = 'Hi, I want this product (' + product.id + ') - ' + product.name;
        const waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
        modalWaBtn.href = waUrl;
        
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling behind modal
    }
    
    // Close Modal
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            productModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close on outside click
    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal) {
                productModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Filter logic removed in favor of distinct sections

    // Search Logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderProducts();
        });
    }

    // Scroll Animations using Intersection Observer
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-up:not(.visible)');
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // Portfolio Logic
    const portfolioGrid = document.getElementById('portfolioGrid');
    const portfolioImages = [
        "assets/projects/04ECE8C1-F334-425A-B19B-153000DDE744.JPG",
        "assets/projects/06957278-19E0-4498-93E7-3F7E80E9AE20.JPG",
        "assets/projects/2D76DF19-FEDC-4849-9405-C3BB30CDCF5D.JPG",
        "assets/projects/3F15ACE9-AB1F-4176-927B-CAE031CB6C74.JPG",
        "assets/projects/981C32F2-CD93-4672-B900-71CE72382B83.JPG",
        "assets/projects/A06F3A79-80AC-4FCE-A182-AA67F72811B7.JPG",
        "assets/projects/CB385E05-D18E-4004-A71E-73847D3B77B0.JPG",
        "assets/projects/CE8D3B86-4ADC-4C75-B730-93D6C6D1C31F.JPG",
        "assets/projects/IMG_5732.jpg",
        "assets/projects/IMG_6446.JPG",
        "assets/projects/IMG_6485.JPG"
    ];

    function renderPortfolio() {
        if (!portfolioGrid) return;
        
        portfolioImages.forEach((src, index) => {
            const item = document.createElement('div');
            item.className = `portfolio-item fade-up delay-${(index % 3) + 1}`;
            item.innerHTML = `<img src="${src}" alt="Completed lay lab decor project" loading="lazy">`;
            portfolioGrid.appendChild(item);
        });
    }

    // Initialize
    renderCategoryGrid();
    renderProducts(); // Initializes empty state ready for search
    renderPortfolio();
    initScrollAnimations();

    // Re-check animations strictly immediately to handle elements already in view
    setTimeout(() => {
        document.querySelectorAll('.fade-up').forEach(el => {
            const rect = el.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                 el.classList.add('visible');
            }
        });
    }, 100);

    // EmailJS Contact Form Logic
    // IMPORTANT: Replace these with your actual IDs from EmailJS dashboard
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
