export default function InformationText() {
    return (
        <div class="m-4 text-md">
            <h1 class="font-bold text-2xl mb-2">how to play</h1>
            <p class="mb-2">
                1. Try to guess the Southern Nevada boulder in 6 guesses.
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
                A. <span class="font-bold">Grade</span> is within 1.
            </p>
            <p class="ml-4 mb-2">
                B. <span class="font-bold">Length</span> is within 2 ft.
            </p>
            <p class="ml-4 mb-2">
                C. <span class="font-bold">Distance</span> is within 528 ft.
            </p>
            <p class="ml-4 mb-2">
                D. <span class="font-bold">Stars</span> are within 0.5 points.
            </p>
            <p class="ml-4 mb-2">
                E. <span class="font-bold">Votes</span> are within 50 points.
            </p>
            <p class="mb-2">4. Image gets less blurry the more you guess.</p>
            <p>5. New climb is available at midnight local time.</p>
        </div>
    );
}
