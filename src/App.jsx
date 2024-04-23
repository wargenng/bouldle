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
import Footer from "./components/footer";

const blurAmountList = [
    "blur-[35px]",
    "blur-[20px]",
    "blur-[15px]",
    "blur-[10px]",
    "blur-[5px]",
    "blur-[2px]",
];
const allowedGuesses = blurAmountList.length;
const todaysClimb =
    climbData.climbs[
        Math.abs(
            Math.floor(
                random(getCurrentDateFormattedAsInt()) * climbData.climbs.length
            )
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
    const [isExpanded, setIsExpanded] = createSignal(false);

    createEffect(() => {
        const selectedTheme = localStorage.getItem("theme");

        if (selectedTheme) {
            document.body.classList.add(selectedTheme);
            if (selectedTheme === "light") setIsDarkMode(false);
            else setIsDarkMode(true);
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark");
            setIsDarkMode(true);
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.add("light");
        }

        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                submitGuess();
                document.activeElement.blur();
            }
        });
    });

    const state = () => {
        const lastGuess = submittedGuesses().at(-1);
        if (lastGuess?.toLowerCase() === todaysClimb.route.toLowerCase())
            return "won";

        if (submittedGuesses().length >= allowedGuesses) return "lost";

        return "playing";
    };

    const submitGuess = () => {
        window.scrollTo(0, 0);
        if (state() !== "playing") return;
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

    const share = async () => {
        window.scrollTo(0, 0);
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
                <div class="bg-warn text-white font-bold p-2">
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
                <div class="absolute w-5/6 bg-background rounded-lg shadow-md flex flex-col justify-center">
                    <Information />
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
            <div class="w-full flex-col items-center justify-center">
                <navbar class="w-full flex border-b border-primary/20 mb-6">
                    <div class="p-4 flex w-full ">
                        <h1 class="text-2xl font-bold ">bouldle.</h1>
                        <div class="grow" />
                        <Theme
                            isDarkMode={isDarkMode()}
                            setIsDarkMode={setIsDarkMode}
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
                </navbar>
                <div class={`w-full items-center justify-center my-4 flex`}>
                    <div
                        class={`pointer-events-none ${
                            showImage() && isExpanded()
                                ? "h-96"
                                : showImage()
                                ? "h-60"
                                : "h-0"
                        } ${
                            isExpanded() ? "w-96" : "w-60"
                        } overflow-hidden flex items-center justify-center object-cover shadow-lg transition-all duration-500`}
                    >
                        <img
                            class={`min-w-full ${
                                state() !== "playing"
                                    ? "blur-[0px]"
                                    : blurAmountList[submittedGuesses().length]
                            }`}
                            src={todaysClimb.image}
                        />
                    </div>
                </div>
                <div class="w-full grid grid-cols-12 justify-start px-6 my-4 text-lg font-bold">
                    <div class="col-span-5">
                        Guess{" "}
                        {state() !== "playing" &&
                        submittedGuesses().length < allowedGuesses
                            ? submittedGuesses().length
                            : submittedGuesses().length < allowedGuesses
                            ? submittedGuesses().length + 1
                            : "X"}{" "}
                        of {allowedGuesses}
                    </div>

                    <div
                        class={`grow flex items-center justify-center col-span-2 transition-[opacity] duration-500 ${
                            showImage() ? "opacity-100" : "opacity-0"
                        }`}
                        onclick={() => {
                            setIsExpanded(!isExpanded());
                        }}
                    >
                        {isExpanded() ? (
                            <svg
                                fill="currentColor"
                                stroke-width="0"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                height="1em"
                                width="1em"
                                style="overflow: visible; color: currentcolor;"
                            >
                                <path d="M439 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H296c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87zM72 272h144c13.3 0 24 10.7 24 24v144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0L7 473c-9.4-9.4-9.4-24.6 0-33.9l87-87L55 313c-6.9-6.9-8.9-17.2-5.2-26.2S62.3 272 72 272z"></path>
                            </svg>
                        ) : (
                            <svg
                                fill="currentColor"
                                stroke-width="0"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                height="1em"
                                width="1em"
                                style="overflow: visible; color: currentcolor;"
                            >
                                <path d="M344 0h144c13.3 0 24 10.7 24 24v144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512H24c-13.3 0-24-10.7-24-24V344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z"></path>
                            </svg>
                        )}
                    </div>
                    <div
                        class="flex justify-end col-span-5"
                        onclick={() => {
                            setShowImage(!showImage());
                        }}
                    >
                        {showImage() ? (
                            <>
                                <span class="underline mr-1">hide image</span>▼
                            </>
                        ) : (
                            <>
                                <span class="underline mr-1">show image</span>▲
                            </>
                        )}
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
                <Footer />
            </div>
        </div>
    );
}

export default App;
