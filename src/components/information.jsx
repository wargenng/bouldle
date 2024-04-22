export default function Information(props) {
    return (
        <div class="m-4 text-md">
            <h1 class="font-bold text-2xl mb-2">how to play</h1>
            <p class="mb-2">
                1. Try to guess the southern nevada boulder in 6 guesses.
            </p>
            <p class="mb-2">
                2. <span class="text-green-500 font-bold">Green</span> is an
                exact match.
            </p>
            <p class="mb-2">
                3. <span class="text-yellow-300 font-bold">Yellow</span> is a
                close match. A close...
            </p>
            <p class="ml-4 mb-2">
                A. <span class="font-bold">Grade</span>,{" "}
                <span class="font-bold">Distance </span>
                is off by at most 1.
            </p>
            <p class="ml-4 mb-2">
                B. <span class="font-bold">Length</span> is off by 2 ft.
            </p>
            <p class="ml-4 mb-2">
                C. <span class="font-bold">Stars</span> is off by 0.5 points.
            </p>
            <p class="ml-4 mb-2">
                D. <span class="font-bold">Votes</span> is off by 50 point.
            </p>
            <p>4. Image gets less blurry the more you guess.</p>
            <p>5. New climb is available at midnight local time.</p>
        </div>
    );
}
