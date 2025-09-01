// Sticky header and TOC scroll functionality
(function() {
    let isInitialized = false;

    function initStickyHeader() {
        // Only run sticky header logic on mobile
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

        // Scroll-back fix for menu/toc toggles
        document.querySelectorAll('label[for="menu-control"], label[for="toc-control"]')
        .forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                const scrollY = window.scrollY;
                
                // Prevent any immediate scroll behavior
                e.preventDefault();
                
                // Manually toggle the checkbox
                const forAttribute = toggle.getAttribute('for');
                const checkbox = document.getElementById(forAttribute);
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                
                // Restore scroll position after any potential scrolling
                setTimeout(function() {
                    window.scrollTo(0, scrollY);
                }, 10); // Increased timeout to catch delayed scroll events
                
                // Additional safety check with multiple timeouts
                setTimeout(function() {
                    if (window.scrollY !== scrollY) {
                        window.scrollTo(0, scrollY);
                    }
                }, 50);
            });
        });



        // Initial check
        updateHeaderState();
        
        isInitialized = true;
    }

    // TOC scroll functionality
    function initTocScroll() {
        // Function to get header height for offset calculation
        function getHeaderOffset() {
            const header = document.querySelector('.book-header');
            if (header && window.innerWidth <= 768) {
                // On mobile, account for sticky header height
                const headerHeight = header.offsetHeight;
                return headerHeight + 16; // Add some padding
            }
            return 0;
        }

        // Function to smooth scroll to target with offset
        function scrollToTarget(target, offset = 0) {
            const targetRect = target.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetTop = targetRect.top + scrollTop - offset;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });
        }

        // Handle TOC anchor clicks
        function handleTocClick(event) {
            const link = event.target.closest('a[href^="#"]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            // Find the target element
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            
            if (target) {
                event.preventDefault();
                const offset = getHeaderOffset();
                scrollToTarget(target, offset);
            }
        }

        // Add click handlers to TOC links
        function attachTocHandlers() {
            // Find TOC containers
            const tocContainers = document.querySelectorAll('.book-toc, .book-header aside');
            
            tocContainers.forEach(container => {
                container.addEventListener('click', handleTocClick);
            });
        }

        // Handle hash changes (back/forward navigation)
        function handleHashChange() {
            const hash = window.location.hash;
            if (hash) {
                const target = document.getElementById(hash.substring(1));
                if (target) {
                    setTimeout(() => {
                        const offset = getHeaderOffset();
                        scrollToTarget(target, offset);
                    }, 100); // Small delay to ensure page is settled
                }
            }
        }

        // Initialize TOC scroll handlers
        attachTocHandlers();
        
        // Handle page load with hash
        if (window.location.hash) {
            // Delay to ensure page is fully loaded
            setTimeout(handleHashChange, 500);
        }

        // Handle hash changes during navigation
        window.addEventListener('hashchange', handleHashChange);
    }

    function handleResize() {
        if (window.innerWidth <= 768 && !isInitialized) {
            initStickyHeader();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Always initialize TOC scroll functionality
            initTocScroll();
            // Only initialize sticky header on mobile
            initStickyHeader();
        });
    } else {
        // Always initialize TOC scroll functionality
        initTocScroll();
        // Only initialize sticky header on mobile
        initStickyHeader();
    }

    // Handle window resize
    window.addEventListener('resize', handleResize);
})();
