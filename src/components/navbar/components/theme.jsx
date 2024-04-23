import Dark from "../../../assets/dark";
import Light from "../../../assets/light";

export default function Theme(props) {
    const handleTheme = () => {
        document.body.classList.remove(props.isDarkMode ? "dark" : "light");
        document.body.classList.add(props.isDarkMode ? "light" : "dark");
        localStorage.setItem("theme", props.isDarkMode ? "light" : "dark");
        props.setIsDarkMode(!props.isDarkMode);
    };

    return (
        <button onclick={handleTheme} class="mr-2">
            {!props.isDarkMode ? <Light /> : <Dark />}
        </button>
    );
}
