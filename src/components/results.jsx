import Share from "../assets/share";
import Warn from "./warn";
import { daysBetweenDates } from "../utilities/daysBetweenDates";
import { getCurrentDateFormattedAsInt } from "../utilities/getCurrentDateFormattedAsInt";
import { createSignal } from "solid-js";
import { ConfettiExplosion } from "solid-confetti-explosion";

export default function Results(props) {
    const [showWarnTodayClimb, setShowWarnTodayClimb] = createSignal(false);
    const share = async () => {
        window.scrollTo(0, 0);
        try {
            await navigator.clipboard.writeText(
                `bouldle #${daysBetweenDates(
                    "20240419",
                    getCurrentDateFormattedAsInt().toString()
                )} 🪨 ${
                    props.state === "won" ? props.submittedGuessesLength : "X"
                }/${props.allowedGuesses} ${
                    props.state === "won"
                        ? "⬜".repeat(props.submittedGuessesLength - 1) + "🟩"
                        : "⬜".repeat(props.submittedGuessesLength)
                } bouldle.com`
            );
            console.log("Text copied to clipboard successfully!");
            props.warn("text successfully copied!");
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <>
            {props.state === "won" ? (
                <div class="flex items-center justify-center fixed top-0 w-full pointer-events-none">
                    <ConfettiExplosion
                        particleCount={100}
                        stageHeight={1000}
                        stageWidth={400}
                        duration={3000}
                    />
                </div>
            ) : null}
            <Warn
                showWarn={showWarnTodayClimb()}
                setShowWarn={setShowWarnTodayClimb}
                route={props.todaysClimb.route}
                link={props.todaysClimb.link}
            />
            <div class={`text-2xl font-bold text-center mb-4 px-4`}>
                {props.state === "won" ? "you won!" : "you lost!"}{" "}
                {`the climb is: `}
                <span
                    class="underline"
                    onclick={() => {
                        setShowWarnTodayClimb(true);
                    }}
                >
                    {props.todaysClimb.route}
                </span>
            </div>
            <div class="w-full flex justify-center">
                <button
                    class="bg-slate-500 text-white py-3 px-4 rounded-lg text-lg font-bold flex items-center"
                    onclick={share}
                >
                    share results
                    <Share />
                </button>
            </div>
        </>
    );
}
