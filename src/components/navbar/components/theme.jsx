import { createSignal, createEffect } from "solid-js";
import Dark from "../../../assets/dark";
import Light from "../../../assets/light";

export default function Theme() {
    const [isDarkMode, setIsDarkMode] = createSignal(
        localStorage.getItem("theme")
            ? localStorage.getItem("theme") === "dark"
            : window.matchMedia("(prefers-color-scheme: dark)")
    );

    createEffect(() => {
        document.body.classList.add(isDarkMode() ? "dark" : "light");
        document.body.classList.remove(isDarkMode() ? "light" : "dark");
    });

    const handleTheme = () => {
        setIsDarkMode(!isDarkMode());
        localStorage.setItem("theme", isDarkMode() ? "dark" : "light");
    };

    return (
        <button onclick={handleTheme} class="mr-2">
            {isDarkMode() ? <Light /> : <Dark />}
        </button>
    );
}
