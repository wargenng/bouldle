export default function Details(props) {
    return (
        <div
            class={`p-2 rounded-lg flex flex-col items-center ${props.colSpan} ${props.bgColor}`}
        >
            <div class="text-sm font-medium">{props.title}</div>
            <div class="text-lg font-bold h-full flex items-center">
                {props.value}
            </div>
        </div>
    );
}
