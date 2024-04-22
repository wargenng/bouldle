import { createEffect, createSignal } from "solid-js";
import { getCurrentDateFormattedAsInt } from "./utilities/getCurrentDateFormattedAsInt";
import { random } from "./utilities/random";
import climbData from "../scripts/data.json";
import Guess from "./components/guess/guess";
import "@thisbeyond/solid-select/style.css";
import "./styles/select.css";
import { ConfettiExplosion } from "solid-confetti-explosion";
import Information from "./components/information";
import { delay } from "./utilities/delay";
import { daysBetweenDates } from "./utilities/daysBetweenDates";
import Close from "./components/close";
import Warn from "./components/warn";
import Options from "./components/options";
import Theme from "./components/theme";

const blurAmountList = [35, 20, 15, 10, 5, 2];
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
    const [showWarnTodayClimb, setShowWarnTodayClimb] = createSignal(false);
    const [showImage, setShowImage] = createSignal(true);
    const [isDarkMode, setIsDarkMode] = createSignal(false);

    createEffect(() => {
        const selectedTheme = localStorage.getItem("theme");

        if (selectedTheme) {
            document.body.classList.add(selectedTheme);
            if (selectedTheme === "light") setIsDarkMode(false);
            else setIsDarkMode(true);
        } else {
            document.body.classList.add("light");
        }
    });

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
                .includes(currentGuess().route?.toLowerCase()) ||
            currentGuess() === ""
        ) {
            warn("not in list of climbs");
        } else if (submittedGuesses().includes(currentGuess().route)) {
            warn("already guessed climb");
        } else {
            setSubmittedGuesses([
                ...submittedGuesses(),
                climbData.climbs[
                    climbData.climbs
                        .map((climb) => climb.route.toLowerCase())
                        .indexOf(currentGuess().route.toLowerCase())
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

    const handleTheme = () => {
        if (isDarkMode()) {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            setIsDarkMode(false);
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            setIsDarkMode(true);
            localStorage.setItem("theme", "dark");
        }
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
        <div class="flex justify-center w-full bg-background">
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
            <Warn
                showWarn={showWarnTodayClimb()}
                setShowWarn={setShowWarnTodayClimb}
                route={todaysClimb.route}
                link={todaysClimb.link}
            />
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
                    class="absolute w-screen h-screen bg-primary opacity-20"
                    onclick={handleClose}
                />
                <div class="absolute w-3/4 h-fit bg-background rounded-lg shadow-md flex flex-col justify-center">
                    <Information />
                    <button
                        class="bg-red-600 text-white p-2 m-4 rounded-lg font-bold"
                        onclick={handleClose}
                    >
                        close
                    </button>
                    <div class="w-full h-full flex justify-end absolute pointer-events-none">
                        <Close handleClose={handleClose} />
                    </div>
                </div>
            </div>
            <div class="w-full flex-col items-center justify-center p-6">
                <div class="w-full flex pb-4">
                    <h1 class="text-2xl font-bold">bouldle.</h1>
                    <div class="grow" />
                    <Theme
                        isDarkMode={isDarkMode()}
                        handleTheme={handleTheme}
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
                <div class={`w-full items-center justify-center pb-4 flex`}>
                    <div
                        class={`pointer-events-none ${
                            showImage() ? "h-60" : "h-0"
                        } w-60 overflow-hidden flex items-center justify-center object-cover shadow-lg transition-[height] duration-500`}
                    >
                        <img
                            style={{
                                filter: `blur(${
                                    state() !== "playing"
                                        ? 0
                                        : blurAmountList[
                                              submittedGuesses().length
                                          ]
                                }px)`,
                            }}
                            class={`min-w-full`}
                            src={todaysClimb.image}
                        />
                    </div>
                </div>
                <div class="w-full flex justify-start p-3 text-lg font-bold">
                    <div>
                        Guess{" "}
                        {state() !== "playing" &&
                        submittedGuesses().length < allowedGuesses
                            ? submittedGuesses().length
                            : submittedGuesses().length < allowedGuesses
                            ? submittedGuesses().length + 1
                            : "X"}{" "}
                        of {allowedGuesses}
                    </div>
                    <div class="grow"></div>
                    <div
                        class=""
                        onclick={() => {
                            setShowImage(!showImage());
                        }}
                    >
                        {showImage() ? (
                            <>
                                ▼ <span class="underline">hide</span>
                            </>
                        ) : (
                            <>
                                ▲ <span class="underline">show</span>
                            </>
                        )}
                        <span class="underline"> image</span>
                    </div>
                </div>
                {state() === "playing" ? (
                    <Options
                        climbData={climbData}
                        setCurrentGuess={setCurrentGuess}
                        submitGuess={submitGuess}
                    />
                ) : (
                    <>
                        <div class={`text-2xl font-bold text-center mb-3`}>
                            {state() === "won" ? "you won!" : "you lost!"}{" "}
                            {`the climb is: `}
                            <span
                                class="underline"
                                onclick={() => {
                                    setShowWarnTodayClimb(true);
                                }}
                            >
                                {todaysClimb.route}
                            </span>
                        </div>
                        <div class="w-full flex justify-center">
                            <button
                                class="bg-slate-500 text-white py-3 px-4 rounded-lg text-lg font-bold flex items-center"
                                onclick={share}
                            >
                                share results
                                <svg
                                    fill="none"
                                    stroke-width="2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    viewBox="0 0 24 24"
                                    height="1em"
                                    width="1em"
                                    style="overflow: visible; color: currentcolor;"
                                    class="ml-2"
                                >
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                    <path d="M16 6 12 2 8 6"></path>
                                    <path d="M12 2 12 15"></path>
                                </svg>
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
