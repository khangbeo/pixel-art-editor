import CONFIG from "../config/configs.js";
import state from "../state/state.js";
import { createCell } from "./drawing.js";
import { addToHistory } from "./history.js";

/**
 * This function adjusts the grid size
 * @param {number} newSize - The new size
 */
export function adjustGridSize(newSize, container) {
    const requiredTotalCells = newSize * newSize;
    const fragment = document.createDocumentFragment();
    const currentCells = container.children.length;

    if (currentCells < requiredTotalCells) {
        for (let i = currentCells; i < requiredTotalCells; i++) {
            fragment.appendChild(createCell(container));
        }
        container.appendChild(fragment);
    } else if (currentCells > requiredTotalCells) {
        while (container.children.length > requiredTotalCells) {
            container.lastChild.remove();
        }
    }

    Array.from(container.children).forEach((cell) => {
        cell.style.backgroundColor = "transparent";
    });

    container.style.setProperty("--grid-rows", newSize);
    container.style.setProperty("--grid-cols", newSize);
}

export function updateSize(newSize, container, gridRangeOutput) {
    const size = Math.min(
        Math.max(parseInt(newSize), CONFIG.MIN_GRID_SIZE),
        CONFIG.MAX_GRID_SIZE
    );
    gridRangeOutput.textContent = `${size} x ${size}`;
    adjustGridSize(size, container);
    state.currentSize = size;
}

/**
 * This function clears the grid
 */
export function clearGrid(container) {
    const changes = Array.from(container.children).map((cell, index) => ({
        cellIndex: index,
        previousColor: cell.style.backgroundColor,
        newColor: "",
    }));

    Array.from(container.children).forEach((cell) => {
        cell.style.backgroundColor = "";
    });

    addToHistory(changes);
}

export function getGridState(container) {
    return Array.from(container.children).map(
        (cell) => cell.style.backgroundColor || "transparent"
    );
}

export function setGridState(state, container) {
    state.forEach((color, index) => {
        if (container.children[index]) {
            container.children[index].style.backgroundColor = color;
        }
    });
}
