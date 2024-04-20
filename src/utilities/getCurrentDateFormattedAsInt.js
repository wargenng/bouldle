export function getCurrentDateFormattedAsInt() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1; // getMonth() returns 0-11
    const day = now.getDate();

    // Pad the month and day with leading zeros if necessary
    const formattedMonth = month < 10 ? "0" + month : month;
    const formattedDay = day < 10 ? "0" + day : day;

    // Concatenate and convert to integer
    const formattedDate = `${year}${formattedMonth}${formattedDay}`;
    return parseInt(formattedDate, 10); // Convert string to integer
}
