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

    // 2. Data Categories
    const categoriesList = [
        { name: "Frames", subcats: ["Wall Frames", "Calligraphy Frames", "Arabic Calligraphy", "Texture Frames"], image: "" },
        { name: "Artificial Plants", subcats: ["Artificial Flowers", "Artificial Leafs", "Potted Plants"], image: "" },
        { name: "Wall Decor", subcats: ["Metal Arts", "Resin Arts", "Wall Clocks", "Wall Furnitures"], image: "" },
        { name: "Vases", subcats: ["Ceramic Vases", "Glass Vases"], image: "" },
        { name: "Table & Living Decor", subcats: ["Table Mats", "Under Table Rugs", "Soap Dispensers", "Crockery Decor Sets"], image: "" },
        { name: "Mirrors", subcats: ["Customised Mirrors"], image: "" }
    ];

    const WA_NUMBER = "919037010474";

    // 3. Hero Slider Logic
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

    // 4. Create Minimal Product Card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        
        const message = `Hello LayLab, I am interested in exploring: *${product.name}*\n[ID: ${product.id}]`;
        const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

        card.innerHTML = `
            <a href="${waLink}" target="_blank" class="product-image-container">
                <img src="${product.image}" loading="lazy" alt="${product.name}">
                <div class="hover-overlay"><span class="inquire-text">Inquire</span></div>
            </a>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
            </div>
        `;
        return card;
    }

    // 5. Render Categories
    function renderCategories() {
        const categoryGrid = document.getElementById('categoryGrid');
        if (!categoryGrid) return;
        categoriesList.forEach(cat => {
            const card = document.createElement('a');
            card.href = "#all-products"; 
            card.className = 'category-card';
            
            const subcatText = cat.subcats.join(', ');
            
            card.innerHTML = `
                <div class="category-icon" style="background: #EFEFEF; border: 1px dashed #DDD;">
                    ${cat.image ? `<img src="${cat.image}" alt="${cat.name}">` : `<span style="font-size:1.5rem; color:#AAA; font-weight:200;">[ Image ]</span>`}
                </div>
                <h3>${cat.name}</h3>
                <p class="subcat-text">${subcatText}</p>
            `;
            card.addEventListener('click', () => renderFilteredProducts(cat.name));
            categoryGrid.appendChild(card);
        });
    }

    // 6. Render Products (Filtered)
    function renderFilteredProducts(categoryName) {
        const allProductsGrid = document.getElementById('allProductsGrid');
        const sectionTitle = document.querySelector('#all-products .section-title h2');
        const sectionDesc = document.querySelector('#all-products .section-title p');
        
        if (!allProductsGrid) return;
        allProductsGrid.innerHTML = ''; 
        
        let filtered = products;
        if (categoryName) {
            filtered = products.filter(p => p.category === categoryName);
            if(sectionTitle) sectionTitle.textContent = categoryName;
            if(sectionDesc) sectionDesc.textContent = `Showing beautiful pieces in ${categoryName}.`;
        } else {
            if(sectionTitle) sectionTitle.textContent = "The Collection";
            if(sectionDesc) sectionDesc.textContent = "Browse our premier pieces. Inquire to purchase.";
        }

        filtered.forEach(prod => {
            allProductsGrid.appendChild(createProductCard(prod));
        });
    }

    const resetLinks = document.querySelectorAll('.reset-filter, .nav-menu a[href="#all-products"]');
    resetLinks.forEach(link => {
        link.addEventListener('click', () => renderFilteredProducts(null));
    });

    renderCategories();
    renderFilteredProducts(null);

    // Fade-in observers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
