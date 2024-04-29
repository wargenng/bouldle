import InformationText from "./components/infotext";
import Close from "../../assets/close";
import { createSignal } from "solid-js";
import { delay } from "../../utilities/delay";

export default function Information(props) {
    const handleClose = async () => {
        props.setShowDialog(false);
    };

    return (
        <div
            class={`absolute w-full h-full z-10 flex ${
                props.showDialog ? "pointer-events-all" : "pointer-events-none"
            } items-center justify-center`}
        >
            <div
                class={`absolute w-screen h-screen bg-black transition-opacity duration-500 ${
                    props.showDialog ? "opacity-50" : "opacity-0"
                }`}
                onclick={handleClose}
            />
            <div
                class={`absolute w-5/6 bg-list-background rounded-lg shadow-md flex flex-col justify-center transition-animation duration-500 ${
                    props.showDialog
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                }`}
            >
                <InformationText />
                <button
                    class="bg-warn text-white p-2 m-4 rounded-lg font-bold"
                    onclick={handleClose}
                >
                    close
                </button>
                <div class="w-full h-full flex justify-end absolute pointer-events-none">
                    <Close handleClose={handleClose} />
                </div>
            </div>
        </div>
    );
}
