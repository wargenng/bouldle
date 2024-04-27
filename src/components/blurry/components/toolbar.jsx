import Contract from "../../../assets/contract";
import Expand from "../../../assets/expand";

export default function Toolbar(props) {
    return (
        <div class="w-full grid grid-cols-12 justify-start px-6 my-4 text-lg font-bold">
            <div class="col-span-5">
                Guess{" "}
                {!props.isAnimating
                    ? props.state === "won"
                        ? props.submittedGuessesLength
                        : props.submittedGuessesLength < props.allowedGuesses
                        ? props.submittedGuessesLength + 1
                        : "X"
                    : props.submittedGuessesLength}{" "}
                of {props.allowedGuesses}
            </div>
            <div
                class={`grow flex items-center justify-center col-span-2 transition-[opacity] duration-500 ${
                    props.showImage ? "opacity-100" : "opacity-0"
                }`}
                onclick={() => {
                    props.setIsExpanded(!props.isExpanded);
                }}
            >
                {props.isExpanded ? <Contract /> : <Expand />}
            </div>
            <div
                class="flex justify-end col-span-5"
                onclick={() => {
                    props.setShowImage(!props.showImage);
                }}
            >
                {props.showImage ? (
                    <>
                        <span class="underline mr-1">hide image</span>▲
                    </>
                ) : (
                    <>
                        <span class="underline mr-1">show image</span>▼
                    </>
                )}
            </div>
        </div>
    );
}
