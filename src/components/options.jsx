import { createGroupedOptions } from "../utilities/createGroupedOptions";
import { groupByArea } from "../utilities/groupByArea";
import Search from "../assets/search";
import climbData from "../../scripts/data.json";
import { createEffect, createSignal } from "solid-js";
import Select from "./select/select";

export default function Options(props) {
    const [currentGuess, setCurrentGuess] = createSignal("");

    createEffect(() => {
        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                submitGuess();
                document.activeElement.blur();
            }
        });
    });

    const submitGuess = () => {
        window.scrollTo(0, 0);
        if (props.state !== "playing") return;
        if (
            !climbData.climbs
                .map((climb) => climb.route.toLowerCase())
                .includes(currentGuess().toLowerCase()) ||
            currentGuess() === ""
        ) {
            props.warn("not in list of climbs");
        } else if (props.submittedGuesses.includes(currentGuess())) {
            props.warn("already guessed climb");
        } else {
            props.setSubmittedGuesses([
                ...props.submittedGuesses,
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
        <Select
            data={groupByArea(
                climbData.climbs.map((climb) => {
                    climb.label = `${climb.route} ${climb.grade}`;
                    return climb;
                })
            )}
            class="flex gap-2 text-primary bg-background p-4 border mx-6 rounded border-primary/20"
            currentInput={currentGuess()}
            setCurrentInput={setCurrentGuess}
            submit={submitGuess}
        />
    );
}

// <div class="flex gap-2 text-primary bg-background px-2 border mx-6 rounded border-primary/20">

{
    /* <Select
                class="custom h-12 w-full"
                {...createGroupedOptions(
                    groupByArea(
                        climbData.climbs.map((climb) => {
                            climb.label = `${climb.route} ${climb.grade}`;
                            return climb;
                        })
                    )
                )}
                onChange={setCurrentGuess}
                placeholder="type a climb..."
                format={(item, type) =>
                    type === "option" ? item.label : item.route
                }
            />
            <button onclick={submitGuess}>
                <Search />
            </button> */
}
// </div>
