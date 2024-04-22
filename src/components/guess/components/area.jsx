export default function Area(props) {
    return (
        <div
            class={`p-2 rounded-lg flex flex-col items-center text-sm font-bold col-span-5 ${
                props.todaysClimb === props.guess
                    ? "bg-green-600"
                    : "bg-slate-500"
            }`}
        >
            <h1 class="text-sm font-medium">area</h1>
            <p class="text-lg h-full flex items-center">{props.guess}</p>
        </div>
    );
}
