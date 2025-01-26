# LuxePhonebook 📘🏨

## Overview

LuxePhonebook is an interactive digital directory application designed for luxury properties, providing guests with comprehensive information about various services, amenities, and contact details across different villa locations.

## Features

### 1. Multi-Property Directory
- Interactive landing page showcasing multiple luxury properties
- Easy navigation between different villa directories
- Responsive design for seamless mobile and desktop experience

### 2. Property-Specific Directories
Each property (Villa Clara, Villa Paloma) has a dedicated directory with:
- Categorized information sections
- Modal-based detailed views
- Category filtering functionality
- Scroll-to-top navigation

### 3. Key Components
- **Category Filter**: Dynamically filter directory entries
- **Modal System**: Interactive pop-up windows for detailed information
- **Card Components**: Standardized display of directory entries
- **Responsive Design**: Adaptive layout for various screen sizes

## Technology Stack

- **Frontend**: 
  - Vanilla JavaScript
  - HTML5
  - CSS3
- **Libraries/Tools**:
  - Font Awesome for icons
  - Modern, modular JavaScript architecture

## Project Structure

```
luxephonebook/
│
├── index.html                  # Main landing page
│
├── public/
│   ├── assets/
│   │   ├── images/             # Property and icon images
│   │   └── styles/             # CSS stylesheets
│   │
│   ├── js/
│   │   ├── components/         # Reusable JS components
│   │   │   ├── Card.js
│   │   │   ├── Modal.js
│   │   │   ├── CategoryFilter.js
│   │   │   └── ScrollToTop.js
│   │   │
│   │   ├── utils/              # Utility functions
│   │   └── main.js             # Application initialization
│   │
│   └── pages/                  # Individual property directory pages
│       ├── villaclara.html
│       └── VillaPaloma.html
│
└── README.md
```

## Getting Started

1. Clone the repository
2. Open `index.html` in a modern web browser
3. Navigate through properties and explore their directories

## Customization

- Easily add new properties by creating additional HTML pages
- Modify `public/js/components/` to extend functionality
- Update CSS in `public/assets/styles/` for custom styling

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile and desktop

## Future Enhancements

- Add more properties
- Implement search functionality
- Create backend API for dynamic content management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Specify your license here]

---

*Developed with ❤️ for luxury property guests*
