import { createEffect, createSignal } from "solid-js";
import { getCurrentDateFormattedAsInt } from "./components/getCurrentDateFormattedAsInt";
import { random } from "./components/random";
import climbData from "../scripts/data.json";

function App() {
    const [searchInput, setSearchInput] = createSignal("");
    const [guesses, setGuesses] = createSignal([]);

    const currentDay = Math.abs(
        Math.round(
            random(getCurrentDateFormattedAsInt()) * climbData.climbs.length
        )
    );

    const handleChange = (e) => {
        setSearchInput(e.target.value.toLowerCase());
    };

    const submitGuess = () => {
        if (
            !climbData.climbs
                .map((climb) => climb.route.toLowerCase())
                .includes(searchInput())
        ) {
            alert("not in list of climbs");
        } else if (guesses().includes(searchInput())) {
            alert("already guessed climb");
        } else {
            setGuesses([
                ...guesses(),
                climbData.climbs[
                    climbData.climbs
                        .map((climb) => climb.route.toLowerCase())
                        .indexOf(searchInput())
                ].route,
            ]);
        }

        if (
            climbData.climbs[currentDay].route.toLowerCase() === searchInput()
        ) {
            alert("YOU WON");
        } else if (guesses().length === 8) {
            alert("YOU LOSE");
        }
        document.getElementById("input-climbs").value = "";
    };

    return (
        <div class="flex align-center justify-center p-6 w-full">
            <div class="w-full flex-col items-center justify-center">
                <h1 class="text-2xl pb-4">bouldle.</h1>
                <div class="w-full flex items-center justify-center pb-4">
                    <div class="h-72 w-72 overflow-hidden flex items-center justify-center object-cover">
                        <img
                            class="blur-none w-full h-auto"
                            src={climbData.climbs[currentDay].image}
                        />
                    </div>
                </div>
                <div class="flex gap-2">
                    <input
                        list="list-of-climbs"
                        id="input-climbs"
                        class="bg-slate-300 w-full rounded-lg h-12 pl-4 text-slate-500"
                        onChange={handleChange}
                    />
                    <button
                        class="bg-slate-500 text-white py-3 px-4 rounded-lg"
                        onclick={submitGuess}
                    >
                        ✔
                    </button>
                    <datalist id="list-of-climbs">
                        {climbData.climbs.map((climb) => (
                            <option value={climb.route} />
                        ))}
                    </datalist>
                </div>
                <div>
                    {guesses().map((guess) => (
                        <div class="flex">{guess}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
