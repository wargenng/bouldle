import gradeData from "../../../../scripts/grades.json";
import { haversine } from "../../../utilities/haversine";

export function compareGuessToAnswer(guess, todaysClimb) {
    const distance = haversine(
        guess.latitude,
        guess.longitude,
        todaysClimb.latitude,
        todaysClimb.longitude
    );

    let details = [
        {
            title: "grade",
            colSpan: "col-span-4",
            bgColor: findBgColor(
                todaysClimb.grade === guess.grade,
                Math.abs(
                    gradeData.grades.indexOf(todaysClimb.grade) -
                        gradeData.grades.indexOf(guess.grade)
                ) <= 4
            ),
            value: `${guess.grade} 
            ${
                todaysClimb.grade !== guess.grade
                    ? gradeData.grades.indexOf(guess.grade) <
                      gradeData.grades.indexOf(todaysClimb.grade)
                        ? "▲"
                        : "▼"
                    : ""
            }`,
            defaultValue: guess.grade,
            score:
                todaysClimb.grade === guess.grade
                    ? 2
                    : Math.abs(
                          gradeData.grades.indexOf(todaysClimb.grade) -
                              gradeData.grades.indexOf(guess.grade)
                      ) <= 4
                    ? 1
                    : 0,
        },
        {
            title: "length",
            colSpan: "col-span-4",
            bgColor: findBgColor(
                todaysClimb.length === guess.length,
                todaysClimb.length + 2 > guess.length &&
                    todaysClimb.length - 2 < guess.length
            ),
            value: `${guess.length === "" ? "N/A" : guess.length + " ft"} 
            ${
                todaysClimb.length === "" ||
                todaysClimb.length === guess.length ||
                guess.length === ""
                    ? ""
                    : guess.length < todaysClimb.length
                    ? "▲"
                    : "▼"
            }`,
            defaultValue: guess.length === "" ? "N/A" : guess.length + " ft",
            score:
                todaysClimb.length === guess.length
                    ? 2
                    : todaysClimb.length + 2 > guess.length &&
                      todaysClimb.length - 2 < guess.length
                    ? 1
                    : 0,
        },
        {
            title: "distance",
            colSpan: "col-span-4",
            bgColor: findBgColor(
                distance.distance === 0,
                distance.unit === "ft"
            ),
            value: `${distance.distance} ${distance.unit} 
        ${distance.distance > 0 ? distance.direction : ""}`,
            defaultValue: "???",
            score: distance.distance === 0 ? 2 : distance.unit === "ft" ? 1 : 0,
        },
        {
            title: "area",
            colSpan: "col-span-5",
            bgColor: findBgColor(todaysClimb.area === guess.area, false),
            value: guess.area,
            defaultValue: guess.area,
            score: todaysClimb.area === guess.area ? 2 : 0,
        },
        {
            title: "stars",
            colSpan: "col-span-3",
            bgColor: findBgColor(
                todaysClimb.stars === guess.stars,
                guess.stars < todaysClimb.stars + 0.5 &&
                    guess.stars > todaysClimb.stars - 0.5
            ),
            value: `${guess.stars} 
            ${
                todaysClimb.stars !== guess.stars
                    ? guess.stars < todaysClimb.stars
                        ? "▲"
                        : "▼"
                    : ""
            }`,
            defaultValue: guess.stars,
            score:
                todaysClimb.stars === guess.stars
                    ? 2
                    : guess.stars < todaysClimb.stars + 0.5 &&
                      guess.stars > todaysClimb.stars - 0.5
                    ? 1
                    : 0,
        },
        {
            title: "votes",
            colSpan: "col-span-4",
            bgColor: findBgColor(
                todaysClimb.votes === guess.votes,
                todaysClimb.votes + 50 > guess.votes &&
                    todaysClimb.votes - 50 < guess.votes
            ),
            value: `${guess.votes} 
            ${
                todaysClimb.votes !== guess.votes
                    ? guess.votes < todaysClimb.votes
                        ? "▲"
                        : "▼"
                    : ""
            }`,
            defaultValue: guess.votes,
            score:
                todaysClimb.votes === guess.votes
                    ? 2
                    : todaysClimb.votes + 50 > guess.votes &&
                      todaysClimb.votes - 50 < guess.votes
                    ? 1
                    : 0,
        },
    ];

    return details;
}

function findBgColor(correct, almost) {
    return correct ? "bg-green-600" : almost ? "bg-yellow-500" : "bg-absent";
}
