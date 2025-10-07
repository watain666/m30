# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/).

## [0.1.9] - 2025-10-07

### Fixed
- Correct phrasing in daily reflections for improved clarity and readability

## [0.1.8] - 2025-09-15

### Fixed
- Fix typo in Day 15 reflection content by changing "驚呀" to "驚訝" for improved accuracy

## [0.1.7] - 2025-09-11

### Changed
- Increase menu width from 21rem to 22rem to improve layout of the book menu content

## [0.1.6] - 2025-09-10

### Fixed
- Update title and audio filename for Day 10 reflection to enhance clarity and consistency

## [0.1.5] - 2025-09-05

### Added
- Add HTML partial for dynamic document head title inclusion in documentation pages
- Enhance audio shortcode with optional title and artist parameters for better metadata control

### Changed
- Improve text formatting and readability in daily reflections (Day 7, Day 28, Day 30)
- Standardize terminology consistency by updating "幻相" to "幻象" in Day 13 and Day 20 content

### Fixed
- Correct minor text inconsistencies and grammatical issues across multiple daily reflection pages
- Resolve text formatting issues to improve content clarity and flow

### Removed
- Remove metadata test page as it is no longer needed

## [0.1.2] - 2025-09-04

### Added
- Add versioning support and build automation with version parameter in hugo.toml
- Create Makefile to automate version updates, website builds, and development server setup
- Add metadata to audio files for mobile media player display

### Changed
- Enhance footer layout and spacing with improved bottom margin for footer date link
- Add horizontal rule in footer for better visual separation

## [0.1.1] - 2025-09-03

### Added
- Update Plyr menu positioning and add internationalization support for audio player controls
- Add Open Graph image for improved social media sharing
- Add comprehensive README.md with detailed project documentation
- Add CHANGELOG.md for tracking project changes
- Add audio shortcode for embedding audio players with customizable options
- Enhance PWA support by adding multiple favicon sizes and updating web app manifest

### Changed
- Standardize all 30-day course titles to match book table of contents exactly
- Update title formatting for consistency across all course pages
- Improve audio file naming consistency with course titles
- Enhance shortcode syntax compliance for better Hugo processing
- Simplified footer date display by removing calendar icon for cleaner appearance
- Optimized footer alignment structure to resolve layout issues after theme updates
- Restored `footer-date-link` styling classes for consistent text formatting

### Fixed
- Resolve Hugo shortcode processing errors that caused `HAHAHUGOSHORTCODE` warnings
- Fix nested shortcode syntax issue in Markdown links that prevented proper rendering
- Correct audio file references to match actual filenames
- Fix punctuation inconsistencies in audio file names (comma vs period separator)
- Fix character encoding issues in Chinese audio filenames
- Remove problematic nested shortcode usage in guide page
- Fixed footer alignment issues that occurred after Hugo theme updates
- Resolved footer element misalignment between date and motivational text
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
