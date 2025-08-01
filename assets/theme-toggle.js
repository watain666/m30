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
    
    // Check system preference for auto mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  }
  
  // Apply theme
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
  
  // Initialize theme on page load
  function initTheme() {
    const theme = getCurrentTheme();
    applyTheme(theme);
  }
  
  // Add event listeners to both toggle buttons
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (themeToggleDesktop) {
    themeToggleDesktop.addEventListener('click', toggleTheme);
  }
  
  // Initialize theme when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
  
  // Listen for system theme changes (only if user hasn't manually set preference)
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        const theme = e.matches ? 'dark' : 'light';
        applyTheme(theme);
      }
    });
  }
})();
