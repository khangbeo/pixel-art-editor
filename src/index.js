import "./styles/main.css";

import state from "./state/state.js";
import CONFIG from "./config/configs.js";
import { updateColor, updateMode, sketch } from "./components/drawing.js";
import {
    adjustGridSize,
    updateSize,
    clearGrid,
    getGridState,
    setGridState,
} from "./components/grid.js";
import { undo, redo } from "./components/history.js";
import { toggleTheme, applyPalette } from "./components/theme.js";
import debounce from "./helpers/debounce.js";

// DOM elements
const container = document.querySelector("#container");
const colorPicker = document.querySelector("#color-picker");
const gridRange = document.querySelector("#grid-range");
const gridRangeOutput = document.querySelector("#grid-range-output");
const clearBtn = document.querySelector("#clear");
const undoBtn = document.querySelector("#undo");
const redoBtn = document.querySelector("#redo");
const modeButtons = document.querySelectorAll(
    "button:not(#undo):not(#redo):not(#clear):not(#save-png):not(#save-local)"
);
const savePngBtn = document.querySelector("#save-png");
const saveLocalBtn = document.querySelector("#save-local");
const loadLocalBtn = document.querySelector("#load-local");
const savedModal = document.querySelector("#saved-modal");
const closeModalBtn = document.querySelector("#close-modal");
const savedList = document.querySelector("#saved-list");
const themeToggle = document.querySelector("#theme-toggle");
const paletteBtns = document.querySelectorAll(".palette-btn");

function saveToPng() {
    const canvas = document.createElement("canvas");
    const size = 1000;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);

    const cellSize = size / state.currentSize;
    Array.from(container.children).forEach((cell, index) => {
        const row = Math.floor(index / state.currentSize);
        const col = index % state.currentSize;
        const color = cell.style.backgroundColor || "transparent";

        if (color !== "transparent") {
            ctx.fillStyle = color;
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    });

    const link = document.createElement("a");
    link.download = `pixel-art-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function saveToLocalStorage() {
    const saves = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || "[]");
    const newSave = {
        id: Date.now(),
        date: new Date().toISOString(),
        size: state.currentSize,
        state: getGridState(container),
        thumbnail: container.innerHTML,
    };

    saves.push(newSave);
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(saves));
    alert("Artwork saved successfully!");
}

function loadFromLocalStorage(saveData) {
    if (saveData.size !== state.currentSize) {
        updateSize(saveData.size, container, gridRangeOutput);
    }
    setGridState(saveData.state, container);
    savedModal.classList.remove("active");
}

function showSavedArtwork() {
    const saves = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY) || "[]");
    savedList.innerHTML = "";

    if (saves.length === 0) {
        savedList.innerHTML = "<p>No saved artwork found.</p>";
        return;
    }

    saves.forEach((save) => {
        const div = document.createElement("div");
        div.className = "saved-item";

        const preview = document.createElement("div");
        preview.style.display = "grid";
        preview.style.width = "100%";
        preview.style.aspectRatio = "1";
        preview.style.gridTemplateColumns = `repeat(${save.size}, 1fr)`;

        save.state.forEach((color) => {
            const cell = document.createElement("div");
            cell.style.backgroundColor = color;
            preview.appendChild(cell);
        });

        const date = new Date(save.date).toLocaleDateString();
        div.appendChild(preview);
        div.innerHTML += `<small>${date}</small>`;

        div.addEventListener("click", () => loadFromLocalStorage(save));
        savedList.appendChild(div);
    });

    savedModal.classList.add("active");
}

function setupEventListeners() {
    container.addEventListener("mousedown", (e) => {
        e.preventDefault();
        state.isDown = true;
    });

    container.addEventListener("mouseup", () => (state.isDown = false));
    container.addEventListener("mouseleave", () => (state.isDown = false));

    colorPicker.addEventListener("input", (e) => {
        updateMode(CONFIG.MODES.COLOR);
        updateColor(e.target.value);
    });

    gridRange.addEventListener(
        "input",
        debounce((e) => updateSize(e.target.value, container, gridRangeOutput))
    );

    clearBtn.addEventListener("click", () => clearGrid(container));
    undoBtn.addEventListener("click", () => undo(container));
    redoBtn.addEventListener("click", () => redo(container));

    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === "z" && !e.shiftKey) {
                e.preventDefault();
                undo(container);
            } else if (e.key === "y" || (e.key === "z" && e.shiftKey)) {
                e.preventDefault();
                redo(container);
            }
        }
    });

    modeButtons.forEach((button) => {
        button.addEventListener("click", () => updateMode(button.id));
    });

    savePngBtn.addEventListener("click", saveToPng);
    saveLocalBtn.addEventListener("click", saveToLocalStorage);
    loadLocalBtn.addEventListener("click", showSavedArtwork);
    closeModalBtn.addEventListener("click", () =>
        savedModal.classList.remove("active")
    );

    savedModal.addEventListener("click", (e) => {
        if (e.target === savedModal) {
            savedModal.classList.remove("active");
        }
    });

    themeToggle.addEventListener("click", () => toggleTheme(themeToggle));

    paletteBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const paletteName = btn.classList[1].toUpperCase();
            applyPalette(CONFIG.PALETTES[paletteName]);
        });
    });
}

function loadInitialValues() {
    try {
        colorPicker.value = state.currentColor;
        gridRange.value = state.currentSize;
        gridRangeOutput.textContent = `${state.currentSize} x ${state.currentSize}`;
        adjustGridSize(state.currentSize, container);

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.documentElement.setAttribute("data-theme", savedTheme);
            const icon = themeToggle.querySelector("i");
            icon.className =
                savedTheme === CONFIG.THEMES.DARK
                    ? "fas fa-sun"
                    : "fas fa-moon";
        }

        const savedPalette = localStorage.getItem("palette");
        if (savedPalette) {
            applyPalette(JSON.parse(savedPalette));
        }
    } catch (error) {
        console.error("Error loading initial values:", error);
    }
}

function initialize() {
    setupEventListeners();
    loadInitialValues();
}

initialize();
