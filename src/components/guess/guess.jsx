import climbData from "../../../scripts/data.json";
import { random } from "../../utilities/random";
import { getCurrentDateFormattedAsInt } from "../../utilities/getCurrentDateFormattedAsInt";
import { haversine } from "../../utilities/haversine";
import { createSignal } from "solid-js";
import Warn from "../warn";
import Grade from "./components/grade";
import Length from "./components/length";
import Distance from "./components/distance";
import Area from "./components/area";
import Stars from "./components/stars";
import Votes from "./components/votes";

export default function Guess(props) {
    const [showWarn, setShowWarn] = createSignal(false);

    const guess =
        climbData.climbs[
            climbData.climbs.map((climb) => climb.route).indexOf(props.guess)
        ];

    const todaysClimb =
        climbData.climbs[
            Math.floor(
                random(getCurrentDateFormattedAsInt()) * climbData.climbs.length
            )
        ];

    const distance = haversine(
        guess.latitude,
        guess.longitude,
        todaysClimb.latitude,
        todaysClimb.longitude
    );

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
                    <Grade
                        todaysClimb={todaysClimb.grade}
                        guess={guess.grade}
                    />
                    <Length
                        todaysClimb={todaysClimb.length}
                        guess={guess.length}
                    />
                    <Distance
                        distance={distance.distance}
                        unit={distance.unit}
                        direction={distance.direction}
                    />
                    <Area todaysClimb={todaysClimb.area} guess={guess.area} />
                    <Stars
                        todaysClimb={todaysClimb.stars}
                        guess={guess.stars}
                    />
                    <Votes
                        todaysClimb={todaysClimb.votes}
                        guess={guess.votes}
                    />
                </div>
            </div>
        </div>
    );
}
