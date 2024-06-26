import { createEffect, createSignal } from "solid-js";
import Clear from "./assets/clear";
import Chevron from "./assets/chevron";
import Search from "./assets/search";

export default function Select(props) {
    const [showDrawer, setShowDrawer] = createSignal(false);
    const [data, setData] = createSignal(props.data);
    const [isFocused, setIsFocused] = createSignal(false);

    createEffect(() => {
        setData(
            props.data
                .filter(
                    (group) =>
                        group.options.filter((child) =>
                            [...new Set(props.currentInput)].every((char) =>
                                child.label
                                    .toLowerCase()
                                    .includes(char.toLowerCase())
                            )
                        ).length > 0
                )
                .map((group) => {
                    return {
                        name: group.name,
                        options: group.options.filter((child) =>
                            [...new Set(props.currentInput)].every((char) =>
                                child.label
                                    .toLowerCase()
                                    .includes(char.toLowerCase())
                            )
                        ),
                    };
                })
        );
    });

    const handleDrawer = () => {
        setShowDrawer(!showDrawer());
    };

    const handleInput = (e) => {
        props.setCurrentInput(e.target.value);
    };

    const handleClear = () => {
        props.setCurrentInput("");
    };

    return (
        <div>
            <div class={props.class}>
                <button
                    class=" bg-background flex items-center gap-4 grow"
                    placeholder="select climb..."
                    onclick={handleDrawer}
                >
                    <Search />
                    <p class="grow flex justify-start text-primary">
                        {props.currentInput === ""
                            ? "search..."
                            : props.currentInput}
                    </p>
                </button>
                <button onclick={handleClear}>
                    <Clear />
                </button>
            </div>
            <div
                class={`w-screen h-screen fixed left-0 top-0 z-10 bg-black transition-opacity duration-300 ${
                    showDrawer()
                        ? "opacity-50 pointer-events-all"
                        : "opacity-0 pointer-events-none"
                }`}
                onclick={handleDrawer}
            />
            <div
                class={`fixed w-screen h-2/3 bg-background rounded-t-lg transition-[bottom] duration-300 z-20 border-t border-primary/20 ${
                    showDrawer() ? "bottom-0" : "bottom-[-700px]"
                }`}
            >
                <div class="flex w-full gap-4 items-center p-4 border-b border-primary/20">
                    <Search />
                    <input
                        class="bg-inherit border-none grow p-2"
                        placeholder="search..."
                        value={props.currentInput}
                        oninput={handleInput}
                        onfocus={() => {
                            setIsFocused(true);
                        }}
                        onblur={() => {
                            setIsFocused(false);
                        }}
                    ></input>
                    <button
                        onclick={handleClear}
                        class={`transition-opacity duration-200 ${
                            isFocused() ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <Clear />
                    </button>
                    <button
                        onclick={handleDrawer}
                        class={`flex justify-center items-center transition-transform duration-100 ${
                            showDrawer() ? "rotate-180" : "rotate-0"
                        }`}
                    >
                        <Chevron />
                    </button>
                </div>
                <div class="h-5/6 overflow-auto px-4 flex flex-col items-start">
                    {data().length > 0 ? (
                        data().map((area) => {
                            return (
                                <>
                                    <div class="sticky top-0 bg-background w-full py-2 flex gap-4 font-semibold">
                                        <h1 class="text-md brightness-50">
                                            {area.name.toUpperCase()}
                                        </h1>
                                        <h1 class="text-md brightness-50 italic">
                                            {area.options.length} climbs
                                        </h1>
                                    </div>
                                    {area.options.map((climb) => {
                                        return (
                                            <button
                                                onclick={() => {
                                                    props.setCurrentInput(
                                                        climb.route
                                                    );
                                                    handleDrawer();
                                                    props.submit();
                                                }}
                                                class="text-lg mb-4 text-left w-full"
                                            >
                                                {climb.label}
                                            </button>
                                        );
                                    })}
                                </>
                            );
                        })
                    ) : (
                        <div class="mt-2 brightness-50">no results found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
