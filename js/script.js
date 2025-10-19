
document.addEventListener('DOMContentLoaded', function() {
    

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {

            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
           
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
        

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        

        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnButton && navMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    

    const companiesScroll = document.querySelector('.companies-scroll');
    
    if (companiesScroll) {
   
        const scrollContent = companiesScroll.innerHTML;
        companiesScroll.innerHTML = scrollContent + scrollContent;
        
        let scrollPosition = 0;
        const scrollSpeed = 0.5;
        
        function animateScroll() {
            scrollPosition += scrollSpeed;
            
      
            if (scrollPosition >= companiesScroll.scrollWidth / 2) {
                scrollPosition = 0;
            }
            
            companiesScroll.style.transform = `translateX(-${scrollPosition}px)`;
            requestAnimationFrame(animateScroll);
        }
        

        animateScroll();
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        

        link.classList.remove('active');
        

        if (linkPage === currentPage) {
            link.classList.add('active');
        } else if ((currentPage === '' || currentPage === 'index.html') && linkPage === 'index.html') {

            link.classList.add('active');
        }
    });
    

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
      
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    

    const observeElements = document.querySelectorAll('.project, .contact-item');
    
    if ('IntersectionObserver' in window && observeElements.length > 0) {
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        observeElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeInObserver.observe(element);
        });
    }
    

    console.log('TRANLAM Portfolio • Designed with simplicity in mind');
});
