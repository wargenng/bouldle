import climbData from "../../../scripts/data.json";
import { onMount } from "solid-js";
import Details from "./components/details";
import { compareGuessToAnswer } from "./utilities/compareGuessToAnswer";
import { delay } from "../../utilities/delay";
import { setToast } from "../toast";
import { messages } from "./utilities/messages";

export default function Guess(props) {
    const guess =
        climbData.climbs[
            climbData.climbs.map((climb) => climb.route).indexOf(props.guess)
        ];
    const details = compareGuessToAnswer(guess, props.todaysClimb);
    const isMostRecentGuess = props.guessNumber === props.totalGuesses;
    const calcDelay = (i) => 500 + i * 300;

    if (isMostRecentGuess) {
        onMount(async () => {
            props.setIsAnimating(true);
            await delay(calcDelay(details.length) + 300);
            setToast(
                messages(
                    props.totalGuesses,
                    details.reduce((x, detail) => x + parseInt(detail.score), 0)
                )
            );
            props.setIsAnimating(false);
        });
    }

    return (
        <div class="px-6 text-center mb-5">
            <div class="flex items-center gap-4 mb-3">
                <div class="h-20 w-20 rounded-full overflow-hidden object-cover flex items-center justify-center">
                    <img
                        src={guess.image}
                        class="min-w-full min-h-full shrink object-cover"
                    />
                </div>
                <a
                    class="text-xl font-bold underline text-primary"
                    href={guess.link}
                >
                    {guess.route}
                </a>
            </div>
            <div class="grid grid-cols-12 gap-3">
                {details.map((detail, i) => (
                    <Details
                        title={detail.title}
                        colSpan={detail.colSpan}
                        bgColor={detail.bgColor}
                        value={detail.value}
                        defaultValue={detail.defaultValue}
                        shouldAnimate={isMostRecentGuess}
                        delay={500 + i * 300}
                    />
                ))}
            </div>
        </div>
    );
}
