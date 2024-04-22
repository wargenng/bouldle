export default function Votes(props) {
    return (
        <div
            class={`p-2 rounded-lg flex flex-col items-center text-sm font-bold col-span-4 ${
                props.todaysClimb === props.guess
                    ? "bg-green-600"
                    : props.todaysClimb + 50 > props.guess &&
                      props.todaysClimb - 50 < props.guess
                    ? "bg-yellow-500"
                    : "bg-slate-500"
            }`}
        >
            <h1 class="text-sm font-medium">votes</h1>
            <p class="text-lg h-full flex items-center">
                {props.guess}{" "}
                {props.todaysClimb !== props.guess
                    ? props.guess < props.todaysClimb
                        ? "▲"
                        : "▼"
                    : ""}
            </p>
        </div>
    );
}
