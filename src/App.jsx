import { createSignal } from "solid-js";
import { getCurrentDateFormattedAsInt } from "./components/getCurrentDateFormattedAsInt";
import { random } from "./components/random";
import climbData from "../scripts/data.json";
import Guess from "./components/guess";
import { Select, createOptions } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";
import "./select.css";

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
            alert("not in list of climbs");
        } else if (submittedGuesses().includes(currentGuess())) {
            alert("already guessed climb");
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

    const handleClose = () => {
        setShowInfo(false);
    };

    return (
        <div class="flex align-center justify-center w-full">
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
                    <div class="m-4 text-xl">
                        <h1 class="font-bold text-2xl mb-2">how to play</h1>
                        <p class="mb-2">
                            1. Try to guess the red rock boulder in 8 guesses.
                        </p>
                        <p class="mb-2">
                            2.{" "}
                            <span class="text-green-500 font-bold">Green</span>{" "}
                            is an exact match.
                        </p>
                        <p class="mb-2">
                            3.{" "}
                            <span class="text-yellow-300 font-bold">
                                Yellow
                            </span>{" "}
                            is a close match. A close...
                        </p>
                        <p class="ml-4 mb-2">
                            A. <span class="font-bold">Grade</span>,{" "}
                            <span class="font-bold">Distance </span>
                            is off by at most 1.
                        </p>
                        <p class="ml-4 mb-2">
                            B. <span class="font-bold">Length</span> is off by 2
                            ft.
                        </p>
                        <p class="ml-4 mb-2">
                            C. <span class="font-bold">Stars</span> is off by
                            0.5 points.
                        </p>
                        <p class="ml-4 mb-2">
                            D. <span class="font-bold">Votes</span> is off by 50
                            point.
                        </p>
                        <p>4. New climb is available at midnight local time.</p>
                    </div>
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
                <h1 class="text-2xl pb-4">bouldle.</h1>
                <div class="w-full flex items-center justify-center pb-4">
                    <div class="h-72 w-72 overflow-hidden flex items-center justify-center object-cover border-black border-4">
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
                                class="bg-slate-500 text-white py-3 px-4 rounded-lg text-sm"
                                onclick={submitGuess}
                                disabled={state() !== "playing"}
                                style={{
                                    filter:
                                        state() === "playing"
                                            ? ""
                                            : "brightness(.5)",
                                }}
                            >
                                ENTER
                            </button>
                        </div>
                    </>
                ) : (
                    <div class={`text-2xl font-bold text-center`}>
                        {state() === "won"
                            ? "you won!"
                            : "you lost! the climb is: " + todaysClimb.route}
                    </div>
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
