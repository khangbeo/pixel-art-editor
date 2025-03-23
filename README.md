# Pixel Art Editor

A modern, feature-rich pixel art editor built with vanilla JavaScript. Create, edit, and save pixel art with an intuitive interface and powerful tools.

## Features

-   🎨 **Drawing Tools**

    -   Color picker with custom color support
    -   Rainbow mode for dynamic colors
    -   Eraser tool
    -   Adjustable grid size (16x16 to 64x64)

-   ↩️ **History Management**

    -   Undo/Redo functionality
    -   Keyboard shortcuts (Ctrl+Z, Ctrl+Y)
    -   History state preservation

-   💾 **Save Options**

    -   Export as PNG
    -   Save to local storage
    -   Load previous artwork
    -   Preview thumbnails of saved work

-   🎯 **User Interface**
    -   Clean, modern design
    -   Dark/Light theme toggle
    -   Color palette presets (Ocean, Forest, Sunset)
    -   Responsive grid layout

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm (v6 or higher)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/pixel-art-editor.git
    cd pixel-art-editor
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:8080`

### Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be available in the `dist` directory.

## Usage

1. **Drawing**

    - Click and drag on the grid to draw
    - Use the color picker to select colors
    - Click the rainbow mode for random colors
    - Use the eraser to remove colors

2. **Grid Size**

    - Use the slider to adjust grid size
    - Sizes range from 16x16 to 64x64
    - Grid automatically adjusts while maintaining artwork

3. **Saving Work**

    - Click "Save PNG" to download as image
    - Click "Save" to store in browser
    - Click "Load" to view and restore saved work

4. **Theme and Palettes**
    - Toggle dark/light theme
    - Choose from preset color palettes
    - Theme preference is saved automatically

## Project Structure

```
pixel-art-editor/
├── src/
│   ├── components/     # UI components
│   ├── config/         # Configuration files
│   ├── helpers/        # Utility functions
│   ├── state/          # State management
│   ├── styles/         # CSS styles
│   ├── index.html      # Main HTML file
│   └── index.js        # Entry point
├── webpack.config.js   # Webpack configuration
├── package.json        # Project dependencies
└── README.md          # Documentation
```

## Technical Details

-   Built with vanilla JavaScript (ES6+)
-   Uses Webpack for bundling and optimization
-   Implements module pattern for code organization
-   Utilizes CSS Grid for responsive layout
-   Local Storage API for data persistence
-   Canvas API for PNG export

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

-   Font Awesome for icons
-   Modern JavaScript features and best practices
-   Community feedback and suggestions
