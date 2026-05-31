document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Nav
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    if (closeMenuBtn && mobileNav) {
        closeMenuBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    mobileLinks.forEach(link => link.addEventListener('click', () => {
        if(mobileNav) mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    }));

    const WA_NUMBER = "919037010474";

    // 2. Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        const showSlide = (index) => {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };
        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);
        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        };
        if(nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
        if(prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
        dots.forEach(dot => dot.addEventListener('click', (e) => {
            showSlide(parseInt(e.target.dataset.index));
            resetInterval();
        }));
        resetInterval();
    }

    // 3. Create Apple-Style Product Card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        
        const message = `Hello LayLab, I am interested in exploring/ordering: *${product.name}* (${product.price})\n[ID: ${product.id}]`;
        const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" loading="lazy" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-price">${product.price}</span>
                <a href="${waLink}" target="_blank" class="btn-add-to-cart">Add to Cart</a>
            </div>
        `;
        return card;
    }

    // 4. Render Featured Products
    function renderFeaturedProducts() {
        const featuredProductsGrid = document.getElementById('featuredProductsGrid');
        if (!featuredProductsGrid) return;
        featuredProductsGrid.innerHTML = '';
        products.forEach(prod => {
            featuredProductsGrid.appendChild(createProductCard(prod));
        });
    }

    renderFeaturedProducts();

    // 5. Fade-in observers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
