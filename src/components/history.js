import state from "../state/state.js";
import CONFIG from "../config/configs.js";

const undoBtn = document.querySelector("#undo");
const redoBtn = document.querySelector("#redo");

export function updateHistoryButtons() {
    undoBtn.disabled = state.currentHistoryIndex < 0;
    redoBtn.disabled = state.currentHistoryIndex >= state.history.length - 1;
}

export function addToHistory(change) {
    if (state.currentHistoryIndex < state.history.length - 1) {
        state.history = state.history.slice(0, state.currentHistoryIndex + 1);
    }

    state.history.push(change);
    state.currentHistoryIndex++;

    if (state.history.length > CONFIG.MAX_HISTORY_SIZE) {
        state.history.shift();
        state.currentHistoryIndex--;
    }

    updateHistoryButtons();
}

export function undo(container) {
    if (state.currentHistoryIndex < 0) return;

    const change = state.history[state.currentHistoryIndex];

    if (Array.isArray(change)) {
        change.forEach(({ cellIndex, previousColor }) => {
            container.children[cellIndex].style.backgroundColor = previousColor;
        });
    } else {
        container.children[change.cellIndex].style.backgroundColor =
            change.previousColor;
    }

    state.currentHistoryIndex--;
    updateHistoryButtons();
}

export function redo(container) {
    if (state.currentHistoryIndex >= state.history.length - 1) return;

    state.currentHistoryIndex++;
    const change = state.history[state.currentHistoryIndex];

    if (Array.isArray(change)) {
        change.forEach(({ cellIndex, newColor }) => {
            container.children[cellIndex].style.backgroundColor = newColor;
        });
    } else {
        container.children[change.cellIndex].style.backgroundColor =
            change.newColor;
    }

    updateHistoryButtons();
}
