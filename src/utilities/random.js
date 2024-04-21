export function random(seed) {
    //hash seed
    // Simple hash function to mix up bits
    seed ^= seed << 17;
    seed ^= seed >> 19;
    seed ^= seed << 51;

    // Define the constants for the LCG
    const a = 1664525;
    const c = 1013904223;
    const m = 4294967296; // 2^32

    // Update the seed
    seed = (a * seed + c) % m;

    // Return a float in [0, 1)
    return seed / m;
}
