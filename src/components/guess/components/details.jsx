export default function Details(props) {
    return (
        <div
            class={`p-2 rounded-lg flex flex-col items-center ${
                props.colSpan
            } ${
                props.isAnimated || props.isMount
                    ? `${props.bgColor} border-background`
                    : `bg-background border-primary/20`
            } ${
                props.isMount && !props.isAnimated ? "animate-pop-option" : null
            } border`}
        >
            <div class="text-sm font-medium">{props.title}</div>
            <div class="text-lg font-bold h-full flex items-center">
                {props.isAnimated || props.isMount
                    ? props.value
                    : props.defaultValue}
            </div>
        </div>
    );
}
