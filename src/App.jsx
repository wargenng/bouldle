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
import Toolbar from "./components/toolbar";
import Share from "./assets/share";

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
                <Toolbar
                    state={state()}
                    submittedGuessesLength={submittedGuesses().length}
                    allowedGuesses={allowedGuesses}
                    showImage={showImage()}
                    setShowImage={setShowImage}
                    setIsExpanded={setIsExpanded}
                    isExpanded={isExpanded()}
                />
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
                                <Share />
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
