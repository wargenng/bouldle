export default function Distance(props) {
    return (
        <div
            class={`col-span-4  p-2 rounded-lg flex flex-col items-center text-sm font-bold ${
                props.distance === 0
                    ? "bg-green-600"
                    : props.unit === "ft"
                    ? "bg-yellow-500"
                    : "bg-slate-500"
            }`}
        >
            <div class="text-sm font-medium">distance</div>
            <div class="text-lg h-full flex items-center">
                {props.distance} {props.unit}{" "}
                {props.distance > 0 ? props.direction : ""}
            </div>
        </div>
    );
}
