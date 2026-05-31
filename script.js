document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Handler
    const preloader = document.getElementById('preloader');
    if (preloader) {
        document.body.classList.add('preloader-active');
    }
    
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('opacity-0', 'pointer-events-none');
            document.body.classList.remove('preloader-active');
        }
    });

    // Fallback if load event takes too long
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('opacity-0')) {
            preloader.classList.add('opacity-0', 'pointer-events-none');
            document.body.classList.remove('preloader-active');
        }
    }, 2000);

    // 2. Mobile Nav Trigger
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.classList.add('overflow-hidden');
        });
    }
    if (closeMenuBtn && mobileNav) {
        closeMenuBtn.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        });
    }
    mobileLinks.forEach(link => link.addEventListener('click', () => {
        if(mobileNav) mobileNav.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
    }));

    // 3. Navbar scroll listener
    const header = document.querySelector('header.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const WA_NUMBER = "919037010474";

    // 4. Create Apple-Style Product Card (Uniform size and styling)
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card group bg-darkcard border border-white/5 hover:border-gold/20 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(212,175,55,0.04)] flex flex-col justify-between';
        
        const message = `Hello LayLab, I would like to order the product: *${product.name}*\n[ID: ${product.id}]`;
        const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

        card.innerHTML = `
            <div>
                <div class="aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-950 border border-white/5 mb-6 relative">
                    <img src="${product.image}" loading="lazy" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                </div>
                <div class="text-left">
                    <h3 class="font-poppins text-white text-base font-light tracking-wide mb-1">${product.name}</h3>
                </div>
            </div>
            <a href="${waLink}" target="_blank" class="mt-6 w-full text-center bg-white border border-white text-black font-outfit text-xs font-semibold py-3.5 uppercase tracking-wider rounded-full hover:bg-transparent hover:text-white transition-all duration-500 block">
                Order on WhatsApp
            </a>
        `;
        return card;
    }

    // 5. Render Featured Products
    function renderFeaturedProducts() {
        const featuredProductsGrid = document.getElementById('featuredProductsGrid');
        if (!featuredProductsGrid) return;
        featuredProductsGrid.innerHTML = '';
        products.forEach(prod => {
            featuredProductsGrid.appendChild(createProductCard(prod));
        });
    }

    renderFeaturedProducts();

    // 6. Fade-in observers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
