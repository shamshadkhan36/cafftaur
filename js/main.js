
// Main.js - Interaction Logic

document.addEventListener('DOMContentLoaded', () => {

    // --- Scroll Animation Observer ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));


    // --- Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Product Filtering & Carousel Logic ---
    const tabs = document.querySelectorAll('.str-tab');
    const products = document.querySelectorAll('.str-product-card');
    const carouselContainer = document.querySelector('.str-carousel-container');
    const prevBtn = document.querySelector('.str-nav-btn.prev');
    const nextBtn = document.querySelector('.str-nav-btn.next');

    // Filter Logic
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                const filter = tab.getAttribute('data-filter');

                products.forEach(product => {
                    const category = product.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        product.style.display = 'flex';
                    } else {
                        product.style.display = 'none';
                    }
                });
            });
        });

        // Trigger filter for the initially active tab
        const activeTab = document.querySelector('.str-tab.active');
        if (activeTab) {
            activeTab.click();
        }
    }

    // Carousel Scroll Logic
    if (prevBtn && nextBtn && carouselContainer) {
        const scrollAmount = 300; // Adjust scroll distance

        nextBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // --- Product Detail Page Logic ---
    const productData = {
        'cafftaur-energy': {
            title: 'Cafftaur Energy Drink',
            category: 'Energy Drink',
            desc: 'UNLEASH THE RAGE. Ignite your senses with the electric blend of citrus and blue raspberry. Formulated for sustained focus and unyielding power.',
            img: 'assets/images/cafftaur_energy_drink.png',
            size: '250ml',
            energy: '160mg Caffeine'
        },
        'neon-zero': {
            title: 'Cafftaur Soda',
            category: 'Sparkling Soda',
            desc: 'Crisp, refreshing, and timeless. The perfect balance of bubbles and bite.',
            img: 'assets/images/cafftaur_soda.png',
            size: '250ml',
            energy: 'Caffeine Free'
        },
        'cafftaur-water': {
            title: 'Cafftaur Still Water',
            category: 'Mineral Water',
            desc: 'Sourced from the untouched heights of alpine glaciers. Experience hydration in its purest form, rich in natural minerals.',
            img: 'assets/images/cafftaur_still_water.png',
            size: '500ml',
            energy: 'pH 7.8'
        },

    };

    // Check if we are on the detail page
    // Check if we are on the detail page
    const detailTitle = document.getElementById('detail-title');
    if (detailTitle && window.location.pathname.includes('product-detail.html')) {
        const params = new URLSearchParams(window.location.search);
        let productId = params.get('id');

        // Fallback: Try to get product ID from URL path (e.g. /products/neon-rush/)
        if (!productId) {
            // Robustly extract ID from path like .../products/neon-rush/ or .../products/neon-rush/index.html
            const matches = window.location.pathname.match(/products\/([^\/]+)/);
            if (matches && matches[1]) {
                productId = matches[1];
            }
        }

        if (productId && productData[productId]) {
            const data = productData[productId];

            document.getElementById('detail-title').innerText = data.title;
            document.getElementById('detail-category').innerText = data.category;
            document.getElementById('detail-desc').innerText = data.desc;

            // Adjust image path if we are in a subdirectory (clean URL)
            let imagePath = data.img;
            if (window.location.pathname.includes('/products/')) {
                imagePath = '../../' + imagePath;
            }
            document.getElementById('detail-img').src = imagePath;

            document.getElementById('detail-size').innerText = data.size;
            document.getElementById('detail-energy').innerText = data.energy;

            // Cosmetic: Remove index.html from address bar if present
            // Wrapped in try-catch to avoid errors on file:// protocol
            try {
                if (window.location.pathname.endsWith('index.html')) {
                    const newPath = window.location.pathname.replace('index.html', '');
                    window.history.replaceState(null, '', newPath);
                }
            } catch (e) {
                // Ignore security errors on local file system
                console.log('Could not update URL:', e);
            }
        } else {
            // Fallback or redirect if ID invalid
            document.getElementById('detail-title').innerText = 'Product Not Found';
            document.getElementById('detail-desc').innerText = 'Please select a valid product from the products page.';
        }
    }


    // --- Intro Overlay Logic ---
    const introOverlay = document.getElementById('intro-overlay');
    if (introOverlay) {
        // Wait for the logo animation to finish (roughly 3s)
        setTimeout(() => {
            introOverlay.classList.add('hidden');
        }, 3200);
    }

    // --- Spotlight Carousel Logic ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 4000; // 4 seconds per slide

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }

});
