/**
 * Configuration constants
 * All constants are in the CONFIG object for easy access and modification
 * first we have min and max grid size of 16 and 64
 * then we have the default grid size of 16
 * then we have the debounce delay by default 100ms
 * then we have the max history size which limits the number of actions that can be undone and redone
 * then we have the storage key for local storage
 * next we have the different modes of the app: color, rainbow, eraser
 * then the themes of the app: light and dark
 * finally we have the palettes of the app: ocean, forest, sunset
 */
const CONFIG = {
    MIN_GRID_SIZE: 16,
    MAX_GRID_SIZE: 64,
    DEFAULT_GRID_SIZE: 16,
    DEBOUNCE_DELAY: 100,
    MAX_HISTORY_SIZE: 50,
    STORAGE_KEY: "pixel_art_saves",
    MODES: {
        COLOR: "color",
        RAINBOW: "rainbow",
        ERASER: "eraser",
    },
    THEMES: {
        LIGHT: "light",
        DARK: "dark",
    },
    PALETTES: {
        OCEAN: {
            primary: "#2563eb",
            accent: "#0ea5e9",
            tertiary: "#38bdf8",
        },
        FOREST: {
            primary: "#059669",
            accent: "#10b981",
            tertiary: "#34d399",
        },
        SUNSET: {
            primary: "#db2777",
            accent: "#ec4899",
            tertiary: "#f472b6",
        },
    },
};

export default CONFIG;
