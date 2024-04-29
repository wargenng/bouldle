import climbData from "../../../scripts/data.json";
import { getCurrentDateFormattedAsInt } from "../../utilities/getCurrentDateFormattedAsInt";
import { createSignal, onMount } from "solid-js";
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
    const [isMount, setIsMount] = createSignal(
        Array.from({ length: details.length }, () => false)
    );
    const [isAnimated, setIsAnimated] = createSignal(
        Array.from({ length: details.length }, () => false)
    );
    console.log(details.reduce((x, detail) => x + parseInt(detail.score), 0));
    console.log(details.map((detail) => detail.score));

    onMount(async () => {
        if (
            JSON.parse(
                localStorage.getItem(String(getCurrentDateFormattedAsInt()))
            ).at(-1) !== props.guess
        ) {
            setIsAnimated(Array.from({ length: details.length }, () => true));
            return;
        }
        props.setIsAnimating(true);
        await delay(500);

        for (let i = 0; i < 6; i++) {
            setIsMount(
                isMount().map((bool, index) => (index === i ? true : bool))
            );
            await delay(300);
            setIsAnimated(
                isAnimated().map((bool, index) => (index === i ? true : bool))
            );
        }
        await delay(300);
        setToast(
            messages(
                JSON.parse(
                    localStorage.getItem(String(getCurrentDateFormattedAsInt()))
                ).length,
                details.reduce((x, detail) => x + parseInt(detail.score), 0)
            )
        );
        props.setIsAnimating(false);
    });

    return (
        <div class="text-white px-6">
            <div class=" text-center mb-5">
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
                            isAnimated={isAnimated()[i]}
                            isMount={isMount()[i]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
