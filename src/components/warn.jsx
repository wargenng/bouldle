import Close from "./close";

export default function Warn(props) {
    return (
        <div
            class={`fixed top-0 left-0 w-full h-full z-10 transition-opacity ${
                props.showWarn ? "flex" : "hidden"
            } items-center justify-center`}
        >
            <div
                class="absolute w-screen h-screen bg-primary opacity-20"
                onclick={() => {
                    props.setShowWarn(false);
                }}
            />
            <div class="absolute w-3/4 h-fit bg-background rounded-lg shadow-md flex flex-col justify-center">
                <div class="m-4">
                    <h1 class="mb-4 font-bold text-2xl">Warning!</h1>
                    <p class="text-lg">
                        This action will redirect you to{" "}
                        <span class="font-bold">{props.route}</span> Mountain
                        Project page. This will{" "}
                        <span class="font-bold">
                            undo your current progress
                        </span>
                        . Are you sure you want to proceed?
                    </p>
                </div>
                <div class="flex m-4 gap-2">
                    <a
                        class="bg-slate-500 text-white p-2 rounded-lg font-bold w-1/2 text-center"
                        href={props.link}
                    >
                        redirect me!
                    </a>
                    <button
                        class="bg-warn text-white p-2 rounded-lg font-bold w-1/2"
                        onclick={() => {
                            props.setShowWarn(false);
                        }}
                    >
                        close
                    </button>
                </div>

                <div class="w-full h-full flex justify-end absolute pointer-events-none">
                    <Close
                        handleClose={() => {
                            props.setShowWarn(false);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
