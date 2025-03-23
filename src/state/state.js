// State variables
// currentColor is the color of the current cell which is generated randomly at first
// currentMode starts with the default mode which is color
// currentSize starts with the default grid size
// isDown is a boolean to check if mouse is down for drawing
// rainbowColor is the color of the rainbow mode which is generated randomly
import CONFIG from "../config/configs.js";
import generateRandomColor from "../helpers/generateRandomColor.js";

const state = {
    currentColor: generateRandomColor(),
    currentMode: CONFIG.MODES.COLOR,
    currentSize: CONFIG.DEFAULT_GRID_SIZE,
    isDown: false,
    rainbowColor: generateRandomColor(),
    history: [],
    currentHistoryIndex: -1,
};

export default state;
