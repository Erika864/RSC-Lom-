document.addEventListener('DOMContentLoaded', function() {

    // --- LOGIQUE POUR LE MENU BURGER ---
    const burgerMenu = document.getElementById('burger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });
    }

    // --- LOGIQUE POUR LE COMPTEUR DE STATISTIQUES ---
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const prefix = obj.getAttribute('data-prefix') || '';
            const suffix = obj.getAttribute('data-suffix') || '';
            obj.innerHTML = prefix + Math.floor(progress * (end - start) + start) + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const statsSection = document.querySelector('.stats-section');
    let hasAnimated = false;

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    const statNumbers = document.querySelectorAll('.stat-number');
                    statNumbers.forEach(stat => {
                        const value = stat.textContent;
                        
                        // Clear previous attributes
                        stat.removeAttribute('data-prefix');
                        stat.removeAttribute('data-suffix');

                        if (value.includes('<')) {
                            stat.setAttribute('data-prefix', '&lt;');
                        }
                        if (value.includes('+')) {
                             stat.setAttribute('data-suffix', 'k km²');
                        }
                        const endValue = parseInt(value.replace(/[^0-9]/g, ''));
                        animateValue(stat, 0, endValue, 1500);
                    });
                }
            });
        }, { threshold: 0.5 }); 

        observer.observe(statsSection);
    }

});