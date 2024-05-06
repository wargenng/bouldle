import { createSignal, onMount } from "solid-js";
import { delay } from "../../../utilities/delay";

export default function Details(props) {
    const [showResult, setShowResult] = createSignal(!props.shouldAnimate);
    if (props.shouldAnimate) {
        onMount(async () => {
            await delay(props.delay);
            setShowResult(true);
        });
    }
    return (
        <div
            class={`p-2 rounded-lg flex flex-col items-center ${
                props.colSpan
            } ${
                showResult()
                    ? `${props.bgColor} border-background text-white`
                    : `bg-background border-primary/20 text-primary`
            } ${
                showResult() && props.shouldAnimate
                    ? "animate-pop-option"
                    : null
            } border`}
        >
            <div class="text-sm font-medium">{props.title}</div>
            <div class="text-lg font-bold h-full flex items-center">
                {showResult() ? props.value : props.defaultValue}
            </div>
        </div>
    );
}
