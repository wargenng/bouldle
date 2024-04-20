import { createSignal } from "solid-js";
import { getCurrentDateFormattedAsInt } from "./utilities/getCurrentDateFormattedAsInt";
import { random } from "./utilities/random";
import climbData from "../scripts/data.json";
import Guess from "./components/guess";
import { Select, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import "./styles/select.css";
import { ConfettiExplosion } from "solid-confetti-explosion";
import Information from "./components/information";
import { delay } from "./utilities/delay";
import { daysBetweenDates } from "./utilities/daysBetweenDates";

const blurAmountList = [25, 10, 5, 4, 3, 2, 1, 0];
const allowedGuesses = blurAmountList.length;
const todaysClimb =
    climbData.climbs[
        Math.floor(
            random(getCurrentDateFormattedAsInt()) * climbData.climbs.length
        )
    ];

function App() {
    const [currentGuess, setCurrentGuess] = createSignal("");
    const [submittedGuesses, setSubmittedGuesses] = createSignal([]);
    const [showInfo, setShowInfo] = createSignal(true);
    const [currentWarn, setCurrentWarn] = createSignal("");
    const [showWarn, setShowWarn] = createSignal(false);

    const state = () => {
        const lastGuess = submittedGuesses().at(-1);
        if (lastGuess?.toLowerCase() === todaysClimb.route.toLowerCase())
            return "won";
        if (submittedGuesses().length >= allowedGuesses) return "lost";
        return "playing";
    };

    const submitGuess = () => {
        if (
            !climbData.climbs
                .map((climb) => climb.route.toLowerCase())
                .includes(currentGuess().toLowerCase())
        ) {
            warn("not in list of climbs");
        } else if (submittedGuesses().includes(currentGuess())) {
            warn("already guessed climb");
        } else {
            setSubmittedGuesses([
                ...submittedGuesses(),
                climbData.climbs[
                    climbData.climbs
                        .map((climb) => climb.route.toLowerCase())
                        .indexOf(currentGuess().toLowerCase())
                ].route,
            ]);
        }
        setCurrentGuess("");
    };

    const warn = async (warn) => {
        setCurrentWarn(warn);
        setShowWarn(true);

        await delay(2000);
        setShowWarn(false);
    };

    const handleClose = () => {
        setShowInfo(false);
    };

    const share = async () => {
        try {
            await navigator.clipboard.writeText(
                `bouldle #${daysBetweenDates(
                    "20240419",
                    getCurrentDateFormattedAsInt().toString()
                )} 🪨 ${
                    state() === "won" ? submittedGuesses().length : "X"
                }/${allowedGuesses} ${
                    state() === "won"
                        ? "⬜".repeat(submittedGuesses().length - 1) + "🟩"
                        : "⬜".repeat(submittedGuesses().length)
                } bouldle.com`
            );
            console.log("Text copied to clipboard successfully!");
            warn("text successfully copied!");
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <div class="flex justify-center w-full">
            {state() === "won" ? (
                <div class="flex items-center justify-center absolute w-full pointer-events-none">
                    <ConfettiExplosion
                        particleCount={100}
                        stageHeight={2000}
                        stageWidth={400}
                        duration={5000}
                    />
                </div>
            ) : null}
            <div
                class={`absolute pointer-events-none rounded-lg overflow-hidden transition-transform ${
                    showWarn() ? "translate-y-3" : "translate-y-[-4rem]"
                }`}
            >
                <div class="bg-red-500 text-white font-bold p-2">
                    {currentWarn()}
                </div>
            </div>
            <div
                class={`absolute w-full h-full z-10 transition-opacity ${
                    showInfo() ? "flex" : "hidden"
                } items-center justify-center`}
            >
                {" "}
                <div
                    class="absolute w-screen h-screen bg-black opacity-50"
                    onclick={handleClose}
                />
                <div class="absolute w-3/4 h-fit bg-white rounded-lg shadow-md flex flex-col justify-center">
                    <Information />
                    <button
                        class="bg-red-600 text-white p-2 m-4 rounded-lg font-bold"
                        onclick={handleClose}
                    >
                        close
                    </button>
                    <div class="w-full h-full flex justify-end absolute pointer-events-none">
                        <svg
                            fill="currentColor"
                            stroke-width="0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            height="1.5rem"
                            width="1.5rem"
                            style="overflow: visible; color: black;"
                            class="m-4 pointer-events-auto"
                            onclick={handleClose}
                        >
                            <path
                                fill-rule="evenodd"
                                d="m7.116 8-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="w-full flex-col items-center justify-center p-6">
                <div class="w-full flex pb-4">
                    <h1 class="text-2xl font-bold">bouldle.</h1>
                    <div class="grow" />
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
                            setShowInfo(true);
                        }}
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8.568 1.031A6.8 6.8 0 0 1 12.76 3.05a7.06 7.06 0 0 1 .46 9.39 6.85 6.85 0 0 1-8.58 1.74 7 7 0 0 1-3.12-3.5 7.12 7.12 0 0 1-.23-4.71 7 7 0 0 1 2.77-3.79 6.8 6.8 0 0 1 4.508-1.149zM9.04 13.88a5.89 5.89 0 0 0 3.41-2.07 6.07 6.07 0 0 0-.4-8.06 5.82 5.82 0 0 0-7.43-.74 6.06 6.06 0 0 0 .5 10.29 5.81 5.81 0 0 0 3.92.58zM7.375 6h1.25V5h-1.25v1zm1.25 1v4h-1.25V7h1.25z"
                            clip-rule="evenodd"
                        ></path>
                    </svg>
                </div>
                <div class="w-full flex items-center justify-center pb-4">
                    <div class="h-72 w-72 overflow-hidden flex items-center justify-center object-cover shadow-lg">
                        <img
                            style={{
                                filter: `blur(${
                                    state() === "won"
                                        ? 0
                                        : blurAmountList[
                                              submittedGuesses().length
                                          ]
                                }px)`,
                            }}
                            class="min-w-full"
                            src={todaysClimb.image}
                        />
                    </div>
                </div>
                {state() === "playing" ? (
                    <>
                        <div class="w-full flex justify-start p-3 text-lg font-bold">
                            Guess{" "}
                            {submittedGuesses().length < allowedGuesses
                                ? submittedGuesses().length + 1
                                : allowedGuesses}{" "}
                            of {allowedGuesses}
                        </div>
                        <div class="flex gap-2">
                            <Select
                                class="custom h-12 w-full"
                                {...createOptions(
                                    climbData.climbs.map((climb) => climb.route)
                                )}
                                onChange={setCurrentGuess}
                                placeholder="choose a climb..."
                            />
                            <button
                                class="bg-slate-500 text-white py-3 px-4 rounded-lg text-sm font-bold"
                                onclick={submitGuess}
                                disabled={state() !== "playing"}
                                style={{
                                    filter:
                                        state() === "playing"
                                            ? ""
                                            : "brightness(.5)",
                                }}
                            >
                                enter
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div class={`text-2xl font-bold text-center mb-3`}>
                            {state() === "won"
                                ? "you won!"
                                : "you lost! the climb is: " +
                                  todaysClimb.route}
                        </div>
                        <div class="text-center">
                            <button
                                class="bg-blue-500 text-white py-3 px-4 rounded-lg text-lg font-bold"
                                onclick={share}
                            >
                                share
                            </button>
                        </div>
                    </>
                )}
                <div class="py-4">
                    {submittedGuesses()
                        .map((guess) => <Guess guess={guess} />)
                        .reverse()}
                </div>
            </div>
        </div>
    );
}

export default App;
