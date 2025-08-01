// Theme toggle functionality
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
  const rootElement = document.documentElement;
  
  // Get current effective theme (considering auto mode)
  function getCurrentTheme() {
    // Check if user has manually set a theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Default to light theme instead of following system preference
    return 'light';
  }
  
  // Apply theme classes and update buttons
  function applyTheme(theme) {
    if (theme === 'dark') {
      rootElement.classList.add('dark-theme');
      rootElement.classList.remove('light-theme');
    } else {
      rootElement.classList.add('light-theme');
      rootElement.classList.remove('dark-theme');
    }
    
    // Update both buttons appearance
    updateToggleButton(themeToggle, theme);
    updateToggleButton(themeToggleDesktop, theme);
  }
  
  // Update toggle button appearance
  function updateToggleButton(button, theme) {
    if (!button) return;
    
    const lightIcon = button.querySelector('.theme-icon-light');
    const darkIcon = button.querySelector('.theme-icon-dark');
    
    if (theme === 'dark') {
      if (lightIcon) lightIcon.style.display = 'none';
      if (darkIcon) darkIcon.style.display = 'block';
    } else {
      if (lightIcon) lightIcon.style.display = 'block';
      if (darkIcon) darkIcon.style.display = 'none';
    }
  }
  
  // Toggle theme
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  }
  
  // Initialize button states (theme classes should already be applied by inline script)
  function initButtons() {
    const theme = getCurrentTheme();
    updateToggleButton(themeToggle, theme);
    updateToggleButton(themeToggleDesktop, theme);
  }
  
  // Add event listeners to both toggle buttons
  function addEventListeners(button) {
    if (!button) return;
    
    // Prevent default touch behaviors
    button.addEventListener('touchstart', function(e) {
      e.preventDefault();
      this.style.webkitTapHighlightColor = 'transparent';
    }, { passive: false });
    
    button.addEventListener('touchend', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    }, { passive: false });
    
    button.addEventListener('touchmove', function(e) {
      e.preventDefault();
    }, { passive: false });
    
    button.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    });
    
    button.addEventListener('click', function(e) {
      // Only handle click if it's not from a touch event
      if (e.pointerType !== 'touch') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
  
  addEventListeners(themeToggle);
  addEventListeners(themeToggleDesktop);
  
  // Initialize buttons when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initButtons);
  } else {
    initButtons();
  }
  
  // Listen for system theme changes (only if user hasn't manually set preference)
  // Note: Disabled to always default to light theme
  /*
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light';
        applyTheme(theme);
      }
    });
  }
  */
})();
