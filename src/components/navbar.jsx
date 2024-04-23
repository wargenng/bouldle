import { createSignal, createEffect } from "solid-js";
import Theme from "./theme";

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
            <div class="p-4 flex w-full ">
                <h1 class="text-2xl font-bold ">bouldle.</h1>
                <div class="grow" />
                <Theme
                    isDarkMode={isDarkMode()}
                    setIsDarkMode={setIsDarkMode}
                />
                <svg
                    fill="currentColor"
                    stroke-width="0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    height="1.4rem"
                    width="1.4rem"
                    style="overflow: visible; color: currentcolor;"
                    class="mt-1"
                    onclick={() => {
                        props.setShowInfo(true);
                    }}
                >
                    <path
                        fill-rule="evenodd"
                        d="M8.568 1.031A6.8 6.8 0 0 1 12.76 3.05a7.06 7.06 0 0 1 .46 9.39 6.85 6.85 0 0 1-8.58 1.74 7 7 0 0 1-3.12-3.5 7.12 7.12 0 0 1-.23-4.71 7 7 0 0 1 2.77-3.79 6.8 6.8 0 0 1 4.508-1.149zM9.04 13.88a5.89 5.89 0 0 0 3.41-2.07 6.07 6.07 0 0 0-.4-8.06 5.82 5.82 0 0 0-7.43-.74 6.06 6.06 0 0 0 .5 10.29 5.81 5.81 0 0 0 3.92.58zM7.375 6h1.25V5h-1.25v1zm1.25 1v4h-1.25V7h1.25z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
            </div>
        </navbar>
    );
}
