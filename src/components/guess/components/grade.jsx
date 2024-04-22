import gradeData from "../../../../scripts/grades.json";

export default function Grade(props) {
    return (
        <div
            class={`col-span-4 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                props.todaysClimb === props.guess
                    ? "bg-green-600"
                    : Math.abs(
                          gradeData.grades.indexOf(props.todaysClimb) -
                              gradeData.grades.indexOf(props.guess)
                      ) <= 4
                    ? "bg-yellow-500"
                    : "bg-slate-500"
            }`}
        >
            <h1 class="text-sm font-medium">grade</h1>
            <p class="text-lg h-full flex items-center">
                {props.guess} {console.log()}
                {props.todaysClimb !== props.guess
                    ? gradeData.grades.indexOf(props.guess) <
                      gradeData.grades.indexOf(props.todaysClimb)
                        ? "▲"
                        : "▼"
                    : ""}
            </p>
        </div>
    );
}
