import { createSignal } from "solid-js";

export default function Theme(props) {
    const handleTheme = () => {
        document.body.classList.remove(props.isDarkMode ? "dark" : "light");
        document.body.classList.add(props.isDarkMode ? "light" : "dark");
        localStorage.setItem("theme", props.isDarkMode ? "light" : "dark");
        props.setIsDarkMode(!props.isDarkMode);
    };

    return (
        <>
            {!props.isDarkMode ? (
                <svg
                    fill="currentColor"
                    stroke-width="0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    height="1.4rem"
                    width="1.4rem"
                    class="mt-1 mr-2"
                    style="overflow: visible; color: currentcolor;"
                    onclick={handleTheme}
                >
                    <path
                        fill="currentColor"
                        d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93ZM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121Zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121ZM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121ZM23 11v2h-3v-2h3ZM4 11v2H1v-2h3Z"
                    ></path>
                </svg>
            ) : (
                <svg
                    fill="currentColor"
                    stroke-width="0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    height="1.4rem"
                    width="1.4rem"
                    class="mt-1 mr-2"
                    style="overflow: visible; color: currentcolor;"
                    onclick={handleTheme}
                >
                    <path d="M223.5 32C100 32 0 132.3 0 256s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                </svg>
            )}
        </>
    );
}
