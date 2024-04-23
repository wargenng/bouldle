import { createSignal, createEffect } from "solid-js";
import Theme from "./theme";
import Info from "../assets/info";

export default function NavBar(props) {
    const [isDarkMode, setIsDarkMode] = createSignal(false);

    createEffect(() => {
        const selectedTheme = localStorage.getItem("theme");

        if (selectedTheme) {
            document.body.classList.add(selectedTheme);
            if (selectedTheme === "light") setIsDarkMode(false);
            else setIsDarkMode(true);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark");
            setIsDarkMode(true);
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.add("light");
        }
    });

    return (
        <navbar class="w-full flex border-b border-primary/20 mb-6">
            <div class="p-4 flex w-full">
                <h1 class="text-2xl font-bold">bouldle.</h1>
                <div class="grow" />
                <Theme
                    isDarkMode={isDarkMode()}
                    setIsDarkMode={setIsDarkMode}
                />
                <button
                    onclick={() => {
                        props.setShowInfo(true);
                    }}
                >
                    <Info />
                </button>
            </div>
        </navbar>
    );
}
