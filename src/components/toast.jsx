import { createSignal } from "solid-js";
import { delay } from "../utilities/delay";

const [currentToast, setCurrentToast] = createSignal("");
const [showToast, setShowToast] = createSignal(false);

export const setToast = async (warn) => {
    setCurrentToast(warn);
    setShowToast(true);

    await delay(2000);
    setShowToast(false);
};

export function Toast() {
    return (
        <div
            class={`absolute pointer-events-none rounded-lg overflow-hidden transition-transform duration-200 ${
                showToast() ? "translate-y-3" : "translate-y-[-4rem]"
            }`}
        >
            <div class="bg-warn text-white font-bold p-2">{currentToast()}</div>
        </div>
    );
}
