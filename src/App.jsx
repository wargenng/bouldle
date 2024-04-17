import { createEffect, createSignal } from "solid-js";
import { getCurrentDateFormattedAsInt } from "./components/getCurrentDateFormattedAsInt";
import { random } from "./components/random";

function App() {
    const [data, setData] = createSignal(null); // Holds the fetched data
    const [isLoading, setIsLoading] = createSignal(true); // Loading state
    const [currentRoute, setCurrentRoute] = createSignal(null);

    createEffect(async () => {
        const request = await fetch("../scripts/data.json");
        const dataJson = await request.json();
        const currentDay = Math.abs(
            Math.round(
                random(getCurrentDateFormattedAsInt()) * dataJson.climbs.length
            )
        );

        setData(dataJson.climbs);
        setCurrentRoute(currentDay);
        setIsLoading(false);
    });

    return (
        <div class="flex align-center justify-center p-8">
            {isLoading() ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h1>bouldle.</h1>
                    <div class="h-60 w-60 overflow-hidden rounded-full flex items-center justify-center">
                        <img
                            class="blur-none w-full h-auto"
                            src={data()[currentRoute()].image}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
