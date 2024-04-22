export default function Length(props) {
    return (
        <div
            class={`col-span-4 p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                props.todaysClimb === props.guess
                    ? "bg-green-600"
                    : props.todaysClimb + 2 > props.guess &&
                      props.todaysClimb - 2 < props.guess
                    ? "bg-yellow-500"
                    : "bg-slate-500"
            }`}
        >
            <h1 class="text-sm font-medium">length</h1>
            <p class="text-lg h-full flex items-center">
                {props.guess === "" ? "N/A" : props.guess + " ft"}{" "}
                {props.todaysClimb === "" ||
                props.todaysClimb === props.guess ||
                props.guess === ""
                    ? ""
                    : props.guess < props.todaysClimb
                    ? "▲"
                    : "▼"}
            </p>
        </div>
    );
}
