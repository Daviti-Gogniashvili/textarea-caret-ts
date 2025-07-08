# Changelog

All notable changes to this project will be documented in this file.

## [4.0.0] - 2024-01-XX

### Added

- Full TypeScript support with comprehensive type definitions
- Modern ES2018+ build targets
- Improved error handling and validation
- Debug mode for visual debugging
- Comprehensive test suite

### Changed

- **BREAKING**: Requires modern browsers (no IE < 9 support)
- **BREAKING**: Converted to TypeScript
- Improved Firefox detection method
- Better CSS property copying mechanism
- Enhanced position validation

### Removed

- **BREAKING**: Internet Explorer < 9 support
- Deprecated `MozTabSize` property
- Legacy `currentStyle` fallback

### Fixed

- Line height calculation fallbacks
- Position bounds checking
- Race conditions in debug mode
