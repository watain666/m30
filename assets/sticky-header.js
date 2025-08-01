// Sticky header dynamic spacing
(function() {
    let isInitialized = false;

    function initStickyHeader() {
        // Only run on mobile
        if (window.innerWidth > 768) return; // Approximate mobile breakpoint
        
        const header = document.querySelector('.book-header');
        if (!header) return;

        let isSticky = false;
        let ticking = false;

        function updateHeaderState() {
            const scrollY = window.scrollY;
            const shouldBeSticky = scrollY > 10; // Add small threshold to avoid flickering

            if (shouldBeSticky !== isSticky) {
                isSticky = shouldBeSticky;
                
                if (isSticky) {
                    header.classList.add('sticky-active');
                } else {
                    header.classList.remove('sticky-active');
                }
            }
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateHeaderState);
                ticking = true;
            }
        }

        // Listen to scroll events with throttling
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Initial check
        updateHeaderState();
        
        isInitialized = true;
    }

    function handleResize() {
        if (window.innerWidth <= 768 && !isInitialized) {
            initStickyHeader();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStickyHeader);
    } else {
        initStickyHeader();
    }

    // Handle window resize
    window.addEventListener('resize', handleResize);
})();
