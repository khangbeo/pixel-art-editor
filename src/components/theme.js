import CONFIG from "../config/configs.js";

export function toggleTheme(themeToggle) {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === CONFIG.THEMES.DARK;
    const newTheme = isDark ? CONFIG.THEMES.LIGHT : CONFIG.THEMES.DARK;
    const icon = themeToggle.querySelector("i");

    html.setAttribute("data-theme", newTheme);
    icon.className = isDark ? "fas fa-moon" : "fas fa-sun";

    localStorage.setItem("theme", newTheme);
}

export function applyPalette(palette) {
    const root = document.documentElement;
    root.style.setProperty("--primary-color", palette.primary);
    root.style.setProperty("--primary-dark", adjustColor(palette.primary, -10));

    localStorage.setItem("palette", JSON.stringify(palette));
}

export function adjustColor(hex, percent) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.max(0, Math.min(255, r + (r * percent) / 100));
    g = Math.max(0, Math.min(255, g + (g * percent) / 100));
    b = Math.max(0, Math.min(255, b + (b * percent) / 100));

    return (
        "#" +
        Math.round(r).toString(16).padStart(2, "0") +
        Math.round(g).toString(16).padStart(2, "0") +
        Math.round(b).toString(16).padStart(2, "0")
    );
}
