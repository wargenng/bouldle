import { createEffect, createSignal, startTransition } from "solid-js";
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
import NavBar from "./components/navbar/navbar";
import Share from "./assets/share";
import { blurAmountList } from "./utilities/blurAmountList";
import Blurry from "./components/blurry/blurry";
import Results from "./components/results";

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

    return (
        <div class={`flex justify-center w-full bg-background`}>
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
                <Blurry
                    state={state()}
                    submittedGuessesLength={submittedGuesses().length}
                    image={todaysClimb.image}
                />
                {state() === "playing" ? (
                    <Options
                        climbData={climbData}
                        setCurrentGuess={setCurrentGuess}
                        submitGuess={submitGuess}
                    />
                ) : (
                    <Results
                        state={state()}
                        allowedGuesses={allowedGuesses}
                        submittedGuessesLength={submittedGuesses().length}
                        warn={warn}
                        todaysClimb={todaysClimb}
                    />
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
