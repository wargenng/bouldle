import { createEffect, createSignal } from "solid-js";
import { getCurrentDateFormattedAsInt } from "./utilities/getCurrentDateFormattedAsInt";
import { random } from "./utilities/random";
import climbData from "../scripts/data.json";
import Guess from "./components/guess/guess";
import "@thisbeyond/solid-select/style.css";
import "./styles/select.css";
import Options from "./components/options";
import Footer from "./components/footer";
import NavBar from "./components/navbar/navbar";
import { blurAmountList } from "./utilities/blurAmountList";
import Blurry from "./components/blurry/blurry";
import Results from "./components/results";
import { setToast, Toast } from "./components/toast";
import Information from "./components/information/information";

const allowedGuesses = blurAmountList.length;
const todaysClimb =
    climbData.climbs[
        Math.abs(
            Math.floor(
                random(getCurrentDateFormattedAsInt()) * climbData.climbs.length
            )
        )
    ];

const firstVisitKey = "firstVisit";
const todaysKey = String(getCurrentDateFormattedAsInt());


function App() {
    const [submittedGuesses, setSubmittedGuesses] = createSignal(
        JSON.parse(localStorage.getItem(todaysKey)) || [],
    );
    const [showDialog, setShowDialog] = createSignal(
        !localStorage[firstVisitKey],
    );
    localStorage[firstVisitKey] = new Date().getTime();

    createEffect(() => {
        localStorage.setItem(todaysKey, JSON.stringify(submittedGuesses()));
    });

    const state = () => {
        const lastGuess = submittedGuesses().at(-1);
        if (lastGuess?.toLowerCase() === todaysClimb.route.toLowerCase())
            return "won";

        if (submittedGuesses().length >= allowedGuesses) return "lost";

        return "playing";
    };

    return (
        <div class={`flex justify-center w-full bg-background`}>
            <Toast />
            <Information
                showDialog={showDialog()}
                setShowDialog={setShowDialog}
            />
            <div class={`w-full flex-col items-center justify-center `}>
                <NavBar setShowDialog={setShowDialog} />
                <Blurry
                    state={state()}
                    submittedGuessesLength={submittedGuesses().length}
                    image={todaysClimb.image}
                />
                {state() === "playing" ? (
                    <Options
                        state={state()}
                        warn={setToast}
                        submittedGuesses={submittedGuesses()}
                        setSubmittedGuesses={setSubmittedGuesses}
                    />
                ) : (
                    <Results
                        state={state()}
                        allowedGuesses={allowedGuesses}
                        submittedGuessesLength={submittedGuesses().length}
                        warn={setToast}
                        todaysClimb={todaysClimb}
                    />
                )}
                <div class="py-4">
                    {submittedGuesses()
                        .map((guess) => (
                            <Guess guess={guess} todaysClimb={todaysClimb} />
                        ))
                        .reverse()}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
