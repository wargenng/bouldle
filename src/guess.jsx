import climbData from "../scripts/data.json";
import gradeData from "../scripts/grades.json";
import { random } from "./components/random";
import { getCurrentDateFormattedAsInt } from "./components/getCurrentDateFormattedAsInt";
import { haversine } from "./components/haversine";

export default function Guess(props) {
    const guess =
        climbData.climbs[
            climbData.climbs.map((climb) => climb.route).indexOf(props.guess)
        ];

    const currentDay =
        climbData.climbs[
            Math.abs(
                Math.round(
                    random(getCurrentDateFormattedAsInt()) *
                        climbData.climbs.length
                )
            )
        ];

    return (
        <div class="text-white text-center mb-5">
            <div class="flex items-center gap-4 mb-5">
                <div class="h-24 w-24 rounded-full overflow-hidden object-cover">
                    <img src={guess.image} class="w-full h-full" />
                </div>
                <p class="text-2xl text-black font-bold">{guess.route}</p>
            </div>
            <div class="flex gap-3 mb-3 h-24">
                <div
                    class={`w-1/3 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                        currentDay.grade === guess.grade
                            ? "bg-green-600"
                            : Math.abs(
                                  gradeData.grades.indexOf(currentDay.grade) -
                                      gradeData.grades.indexOf(guess.grade)
                              ) <= 4
                            ? "bg-yellow-500"
                            : "bg-slate-500"
                    }`}
                >
                    <h1>grade</h1>
                    <p class="text-2xl">
                        {guess.grade}{" "}
                        {currentDay.grade !== guess.grade
                            ? gradeData.grades.indexOf(guess.grade) <
                              gradeData.grades.indexOf(currentDay.grade)
                                ? "▲"
                                : "▼"
                            : ""}
                    </p>
                </div>
                <div
                    class={`w-1/3 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                        currentDay.length === guess.length
                            ? "bg-green-600"
                            : currentDay.length + 2 > guess.length &&
                              currentDay.length - 2 < guess.length
                            ? "bg-yellow-500"
                            : "bg-slate-500"
                    }`}
                >
                    <h1>length</h1>
                    <p class="text-2xl">
                        {guess.length === "" ? "N/A" : guess.length + " ft"}{" "}
                        {currentDay.length === "" ||
                        currentDay.length === guess.length ||
                        guess.length === ""
                            ? ""
                            : guess.length < currentDay.length
                            ? "▲"
                            : "▼"}
                    </p>
                </div>
                <div
                    class={`grow p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                        haversine(
                            guess.latitude,
                            guess.longitude,
                            currentDay.latitude,
                            currentDay.longitude
                        ).distance === 0
                            ? "bg-green-600"
                            : haversine(
                                  guess.latitude,
                                  guess.longitude,
                                  currentDay.latitude,
                                  currentDay.longitude
                              ).distance < 250
                            ? "bg-yellow-500"
                            : "bg-slate-500"
                    }`}
                >
                    <div>distance</div>
                    <div class="text-lg">
                        {
                            haversine(
                                guess.latitude,
                                guess.longitude,
                                currentDay.latitude,
                                currentDay.longitude
                            ).distance
                        }{" "}
                        ft{" "}
                        {haversine(
                            guess.latitude,
                            guess.longitude,
                            currentDay.latitude,
                            currentDay.longitude
                        ).distance > 0
                            ? haversine(
                                  guess.latitude,
                                  guess.longitude,
                                  currentDay.latitude,
                                  currentDay.longitude
                              ).direction
                            : ""}
                    </div>
                </div>
            </div>
            <div class="flex gap-3 w-full h-24">
                <div
                    class={`w-1/2 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                        currentDay.area === guess.area
                            ? "bg-green-600"
                            : "bg-slate-500"
                    }`}
                >
                    <h1>area</h1>
                    <p class="text-lg">{guess.area}</p>
                </div>
                <div
                    class={`w-1/3 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                        currentDay.stars === guess.stars
                            ? "bg-green-600"
                            : guess.stars < currentDay.stars + 0.5 &&
                              guess.stars > currentDay.stars - 0.5
                            ? "bg-yellow-500"
                            : "bg-slate-500"
                    }`}
                >
                    <h1>stars</h1>
                    <p class="text-2xl">
                        {guess.stars}{" "}
                        {currentDay.stars !== guess.stars
                            ? guess.stars < currentDay.stars
                                ? "▲"
                                : "▼"
                            : ""}
                    </p>
                </div>
                <div
                    class={`w-1/3 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                        currentDay.votes === guess.votes
                            ? "bg-green-600"
                            : currentDay.votes + 50 > guess.votes &&
                              currentDay.votes - 50 < guess.votes
                            ? "bg-yellow-500"
                            : "bg-slate-500"
                    }`}
                >
                    <h1>votes</h1>
                    <p class="text-2xl">
                        {guess.votes}{" "}
                        {currentDay.votes !== guess.votes
                            ? guess.votes < currentDay.votes
                                ? "▲"
                                : "▼"
                            : ""}
                    </p>
                </div>
            </div>
        </div>
    );
}
