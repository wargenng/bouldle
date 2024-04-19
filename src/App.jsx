import { createSignal } from "solid-js";
import { getCurrentDateFormattedAsInt } from "./components/getCurrentDateFormattedAsInt";
import { random } from "./components/random";
import climbData from "../scripts/data.json";
import Guess from "./guess";

const blurAmountList = [25, 10, 5, 4, 3, 2, 1, 0];
const allowedGuesses = blurAmountList.length;
const todaysClimb =
  climbData.climbs[
    Math.floor(random(getCurrentDateFormattedAsInt()) * climbData.climbs.length)
  ];

function App() {
  const [currentGuess, setCurrentGuess] = createSignal("");
  const [submittedGuesses, setSubmittedGuesses] = createSignal([]);

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

  return (
    <div class="flex align-center justify-center p-6 w-full">
      <div class="w-full flex-col items-center justify-center">
        <h1 class="text-2xl pb-4">bouldle.</h1>
        <div class="w-full flex items-center justify-center pb-4">
          <div class="h-72 w-72 overflow-hidden flex items-center justify-center object-cover border-black border-4">
            <img
              style={{
                filter: `blur(${
                  state() === "won"
                    ? 0
                    : blurAmountList[submittedGuesses().length]
                }px)`,
              }}
              class="w-full h-full"
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
              <input
                list="list-of-climbs"
                class="bg-slate-300 w-full rounded-lg h-12 pl-4 text-slate-500"
                onInput={(e) => {
                  setCurrentGuess(e.target.value);
                }}
                value={currentGuess()}
              />
              <button
                class="bg-slate-500 text-white py-3 px-4 rounded-lg"
                onclick={submitGuess}
                disabled={state() !== "playing"}
                style={{
                  filter: state() === "playing" ? "" : "brightness(.5)",
                }}
              >
                ✔
              </button>
              <datalist id="list-of-climbs">
                {climbData.climbs.map((climb) => (
                  <option value={climb.route} />
                ))}
              </datalist>
            </div>
          </>
        ) : (
          <div class={`text-2xl font-bold text-center`}>
            {state() === "won" ? "You won!" : "You lost!"}
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
