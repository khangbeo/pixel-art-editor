import state from "../state/state.js";
import CONFIG from "../config/configs.js";
import generateRandomColor from "../helpers/generateRandomColor.js";
import { addToHistory } from "./history.js";

export function updateColor(newColor) {
    if (!newColor.match(/^#[0-9A-F]{6}$/i)) {
        console.warn("Invalid color format:", newColor);
        return;
    }
    state.currentColor = newColor;
}

export function updateMode(newMode) {
    if (!Object.values(CONFIG.MODES).includes(newMode)) {
        console.warn("Invalid mode:", newMode);
        return;
    }
    deactivateAllButtons();
    state.currentMode = newMode;
    activateButton(document.querySelector(`#${newMode}`));
}

export function sketch({ type, target }, container) {
    if (type === "mouseover" && !state.isDown) return;

    const modes = {
        [CONFIG.MODES.COLOR]: state.currentColor,
        [CONFIG.MODES.RAINBOW]: state.rainbowColor,
        [CONFIG.MODES.ERASER]: "",
    };

    const newColor = modes[state.currentMode];
    const previousColor = target.style.backgroundColor;

    if (previousColor !== newColor) {
        const cellIndex = Array.from(container.children).indexOf(target);
        addToHistory({
            cellIndex,
            previousColor,
            newColor,
        });

        target.style.backgroundColor = newColor;
    }

    if (state.currentMode === CONFIG.MODES.RAINBOW) {
        state.rainbowColor = generateRandomColor();
    }
}

export function createCell(container) {
    const cell = document.createElement("div");
    cell.addEventListener("mouseover", (e) => sketch(e, container));
    cell.addEventListener("mousedown", (e) => sketch(e, container));
    return cell;
}

function deactivateAllButtons() {
    const modeButtons = getModeButtons();
    modeButtons.forEach((button) => button.classList.remove("active"));
}

function activateButton(button) {
    if (button) button.classList.add("active");
}

function getModeButtons() {
    const allButtons = document.querySelectorAll("button");
    return [...allButtons].filter(
        (button) =>
            !["undo", "redo", "clear", "save-png", "save-local"].includes(
                button.id
            )
    );
}
