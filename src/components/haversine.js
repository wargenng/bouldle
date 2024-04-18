export function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    // Haversine formula
    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = Math.round(R * c); // in meters

    // Calculate direction
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x =
        Math.cos(φ1) * Math.sin(φ2) -
        Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    const θ = (Math.atan2(y, x) * 180) / Math.PI;
    let direction = "";

    if (θ >= -22.5 && θ < 22.5) {
        direction = "E";
    } else if (θ >= 22.5 && θ < 67.5) {
        direction = "NE";
    } else if (θ >= 67.5 && θ < 112.5) {
        direction = "N";
    } else if (θ >= 112.5 && θ < 157.5) {
        direction = "NW";
    } else if ((θ >= 157.5 && θ <= 180) || (θ < -157.5 && θ >= -180)) {
        direction = "W";
    } else if (θ >= -157.5 && θ < -112.5) {
        direction = "SW";
    } else if (θ >= -112.5 && θ < -67.5) {
        direction = "S";
    } else if (θ >= -67.5 && θ < -22.5) {
        direction = "SE";
    }

    return { distance, direction };
}
