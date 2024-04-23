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
import Close from "./assets/close";
import Warn from "./components/warn";
import Options from "./components/options";
import Footer from "./components/footer";
import NavBar from "./components/navbar";

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
    const [isExpanded, setIsExpanded] = createSignal(false);

    createEffect(() => {
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
                <NavBar setShowInfo={setShowInfo} />
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
