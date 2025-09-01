// Audio fallback handler for Chinese filename issues
(function() {
  'use strict';
  
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    setupAudioFallbacks();
  });
  
  function setupAudioFallbacks() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(function(audio) {
      // Handle audio loading errors
      audio.addEventListener('error', function(e) {
        console.warn('Audio loading failed for:', audio.src);
        handleAudioError(audio);
      });
      
      // Handle source loading errors
      const sources = audio.querySelectorAll('source');
      sources.forEach(function(source) {
        source.addEventListener('error', function(e) {
          console.warn('Audio source loading failed for:', source.src);
          handleSourceError(source, audio);
        });
      });
    });
  }
  
  function handleAudioError(audio) {
    // Try to reload with different encoding
    const sources = audio.querySelectorAll('source');
    sources.forEach(function(source) {
      const originalSrc = source.src;
      if (originalSrc && !source.dataset.retried) {
        source.dataset.retried = 'true';
        
        // Try to fix URL encoding issues
        const fixedSrc = fixChineseUrl(originalSrc);
        if (fixedSrc !== originalSrc) {
          console.log('Retrying with fixed URL:', fixedSrc);
          source.src = fixedSrc;
        }
      }
    });
    
    // Force reload
    audio.load();
  }
  
  function handleSourceError(source, audio) {
    const originalSrc = source.src;
    if (originalSrc && !source.dataset.retried) {
      source.dataset.retried = 'true';
      
      // Try to fix URL encoding issues
      const fixedSrc = fixChineseUrl(originalSrc);
      if (fixedSrc !== originalSrc) {
        console.log('Retrying source with fixed URL:', fixedSrc);
        source.src = fixedSrc;
        audio.load();
      }
    }
  }
  
  function fixChineseUrl(url) {
    try {
      // Decode URL if it's double-encoded
      let decodedUrl = decodeURIComponent(url);
      
      // If still encoded, decode again
      if (decodedUrl.includes('%')) {
        decodedUrl = decodeURIComponent(decodedUrl);
      }
      
      // Re-encode properly
      const urlParts = decodedUrl.split('/');
      const encodedParts = urlParts.map(function(part, index) {
        if (index < 3) return part; // Don't encode protocol and domain
        return encodeURIComponent(part);
      });
      
      return encodedParts.join('/');
    } catch (e) {
      console.warn('Failed to fix URL encoding for:', url, e);
      return url;
    }
  }
  
  // Add fallback message for unsupported audio
  function addFallbackMessage() {
    const audioElements = document.querySelectorAll('audio');
    
    audioElements.forEach(function(audio) {
      // Check if audio has fallback text
      if (!audio.textContent.trim()) {
        audio.innerHTML = '瀏覽器不支援音檔播放或檔案載入失敗。';
      }
    });
  }
  
  // Initialize fallback messages
  document.addEventListener('DOMContentLoaded', addFallbackMessage);
})();
