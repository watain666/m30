# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/).

## [0.1.1] - 2025-09-03

### Added
- Update Plyr menu positioning and add internationalization support for audio player controls
- Add Open Graph image for improved social media sharing
- Add comprehensive README.md with detailed project documentation
- Add CHANGELOG.md for tracking project changes

### Fixed
- Resolve Hugo shortcode processing errors that caused `HAHAHUGOSHORTCODE` warnings
- Fix nested shortcode syntax issue in Markdown links that prevented proper rendering
- Correct audio file references to match actual filenames
- Fix punctuation inconsistencies in audio file names (comma vs period separator)
- Fix character encoding issues in Chinese audio filenames
- Remove problematic nested shortcode usage in guide page
- Add audio shortcode for embedding audio players with customizable options
- Enhance PWA support by adding multiple favicon sizes and updating web app manifest

### Changed
- Standardize all 30-day course titles to match book table of contents exactly
- Update title formatting for consistency across all course pages
- Improve audio file naming consistency with course titles
- Enhance shortcode syntax compliance for better Hugo processing
- Ensure all audio shortcode references point to existing files
- Enhance audio player functionality with autoplay control and automatic playback of subsequent audio files
- Implement Plyr audio player styles for better user experience
- Update Plyr styles and controls for improved functionality and consistency
- Update audio playbook instructions to include autoplay feature
- Refine navigation instructions in user guide for clarity on course selection
- Update meta tag for mobile web app capability to align with current standards
- Correct typographical errors in Chinese text for improved readability

### Removed
- Remove useless audio fallback handler

## [0.1.0] - 2025-09-02

### Added
- Initial release of Miracle 30 website
- Complete 30-day spiritual growth course content (Day 1-30 + Guide)
- Audio playback functionality with Plyr.js player
- PWA support with offline capabilities and installable app
- Auto-redirect to daily course feature based on current date
- Dark/light theme switching with system preference detection
- Custom audio shortcode for Hugo content management
- Service Worker for caching strategy and offline browsing
- Git submodule-based theme management system
- Custom SCSS styling for Chinese content optimization
- Responsive design for mobile, tablet, and desktop devices
