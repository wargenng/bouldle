import climbData from "../../../scripts/data.json";
import { random } from "../../utilities/random";
import { getCurrentDateFormattedAsInt } from "../../utilities/getCurrentDateFormattedAsInt";
import { createSignal } from "solid-js";
import Warn from "../warn";
import Details from "./components/details";
import gradeData from "../../../scripts/grades.json";
import { compareGuessToAnswer } from "./utilities/compareGuessToAnswer";

export default function Guess(props) {
    const [showWarn, setShowWarn] = createSignal(false);

    const guess =
        climbData.climbs[
            climbData.climbs.map((climb) => climb.route).indexOf(props.guess)
        ];

    const todaysClimb =
        climbData.climbs[
            Math.abs(
                Math.floor(
                    random(getCurrentDateFormattedAsInt()) *
                        climbData.climbs.length
                )
            )
        ];

    const details = compareGuessToAnswer(guess, todaysClimb);

    return (
        <div class="text-white px-6">
            <Warn
                showWarn={showWarn()}
                setShowWarn={setShowWarn}
                route={guess.route}
                link={guess.link}
            />
            <div class=" text-center mb-5">
                <div class="flex items-center gap-4 mb-3">
                    <div class="h-20 w-20 rounded-full overflow-hidden object-cover flex items-center justify-center">
                        <img
                            src={guess.image}
                            class="min-w-full min-h-full shrink"
                        />
                    </div>
                    <p
                        class="text-xl font-bold underline text-primary"
                        onclick={() => {
                            setShowWarn(true);
                        }}
                    >
                        {guess.route}
                    </p>
                </div>
                <div class="grid grid-cols-12 gap-3">
                    {details.map((detail) => (
                        <Details
                            title={detail.title}
                            colSpan={detail.colSpan}
                            bgColor={detail.bgColor}
                            value={detail.value}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
