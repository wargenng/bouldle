import climbData from "../scripts/data.json";

export default function Guess(props) {
    const guess =
        climbData.climbs[
            climbData.climbs.map((climb) => climb.route).indexOf(props.guess)
        ];

    return (
        <div class="text-white text-center mb-5">
            <div class="flex items-center gap-4 mb-5">
                <div class="h-24 w-24 rounded-full overflow-hidden object-cover">
                    <img src={guess.image} class="w-full h-full" />
                </div>
                <p class="text-2xl text-black font-bold">{guess.route}</p>
            </div>
            <div class="flex gap-3 mb-3 h-24">
                <div class="bg-slate-500 w-1/3 p-2 rounded-lg flex flex-col items-center text-lg font-bold">
                    <h1>grade</h1>
                    <p class="text-4xl">{guess.grade}</p>
                </div>
                <div class="bg-slate-500 w-1/3 p-2 rounded-lg flex flex-col items-center text-lg font-bold">
                    <h1>length</h1>
                    <p>{guess.length} ft</p>
                </div>
                <div class="bg-slate-500 grow p-2 rounded-lg flex flex-col items-center text-lg font-bold">
                    distance
                </div>
            </div>
            <div class="flex gap-3 w-full h-24">
                <div class="bg-slate-500 w-1/2 p-2 rounded-lg flex flex-col items-center text-lg font-bold">
                    <h1>area</h1>
                    <p>{guess.area}</p>
                </div>
                <div class="bg-slate-500 w-1/4 p-2 rounded-lg flex flex-col items-center text-lg font-bold">
                    <h1>stars</h1>
                    <p>{guess.stars}</p>
                </div>
                <div class="bg-slate-500 grow p-2 rounded-lg flex flex-col items-center text-lg font-bold">
                    <h1>votes</h1>
                    <p>{guess.votes}</p>
                </div>
            </div>
        </div>
    );
}
