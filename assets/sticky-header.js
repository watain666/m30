// Sticky header and TOC scroll functionality
(function() {
    let isInitialized = false;
    let lastClickedTarget = null; // Move to global scope within IIFE

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
                const forAttribute = toggle.getAttribute('for');
                const checkbox = document.getElementById(forAttribute);
                
                // Handle TOC specially - CSS now prevents layout shifts
                if (forAttribute === 'toc-control') {
                    e.preventDefault();
                    console.log('TOC toggle clicked');
                    
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                    }
                    
                    return;
                }
                
                // For menu control, use original logic
                const scrollY = window.scrollY;
                
                // Prevent any immediate scroll behavior
                e.preventDefault();
                
                // Manually toggle the checkbox
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                }
                
                // Restore scroll position after any potential scrolling
                setTimeout(function() {
                    window.scrollTo(0, scrollY);
                }, 10);
                
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
                lastClickedTarget = target; // Remember this target
                console.log('TOC clicked:', { targetId, target }); // Debug info
                // Let browser handle scrolling naturally with CSS scroll-padding
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

        // Initialize TOC scroll handlers
        attachTocHandlers();
    }

    // Click outside to close TOC functionality
    function initClickOutsideToClose() {
        const tocControl = document.getElementById('toc-control');
        const tocContainer = document.querySelector('.book-toc');
        const tocToggle = document.querySelector('label[for="toc-control"]');
        const mobileHeaderToc = document.querySelector('.book-header aside');
        const tocOverlay = document.querySelector('.book-toc-overlay');
        
        if (!tocControl) return;

        // Function to close TOC (no more custom scrolling)
        function closeToc() {
            console.log('Closing TOC:', { lastClickedTarget }); // Debug info
            tocControl.checked = false;
        }

        // Handle clicks on the document
        document.addEventListener('click', function(event) {
            // Only process if TOC is currently open
            if (!tocControl.checked) return;

            const target = event.target;
            
            // Check if click is inside any TOC area or TOC toggle button
            const isInsideToc = (tocContainer && tocContainer.contains(target)) || 
                               (mobileHeaderToc && mobileHeaderToc.contains(target));
            const isToggleButton = tocToggle && tocToggle.contains(target);
            const isOverlayClick = tocOverlay && tocOverlay.contains(target);
            
            // If click is outside all TOC areas (including overlay), close TOC
            if (!isInsideToc && !isToggleButton || isOverlayClick) {
                closeToc();
            }
        });

        // Handle escape key to close TOC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && tocControl.checked) {
                closeToc();
                event.preventDefault(); // Prevent default escape behavior
            }
        });
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
            // Initialize click outside to close TOC
            initClickOutsideToClose();
            // Only initialize sticky header on mobile
            initStickyHeader();
        });
    } else {
        // Always initialize TOC scroll functionality
        initTocScroll();
        // Initialize click outside to close TOC
        initClickOutsideToClose();
        // Only initialize sticky header on mobile
        initStickyHeader();
    }

    // Handle window resize
    window.addEventListener('resize', handleResize);
})();
