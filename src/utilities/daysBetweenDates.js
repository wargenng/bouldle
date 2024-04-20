export function daysBetweenDates(dateStr1, dateStr2) {
    // Function to parse a string in the format YYYYMMDD into a Date object
    const parseDate = (dateStr) => {
        const year = parseInt(dateStr.substring(0, 4), 10);
        const month = parseInt(dateStr.substring(4, 6), 10) - 1; // JavaScript months are 0-indexed
        const day = parseInt(dateStr.substring(6, 8), 10);
        return new Date(year, month, day);
    };

    // Parsing both date strings into Date objects
    const date1 = parseDate(dateStr1);
    const date2 = parseDate(dateStr2);

    // Calculating the difference in milliseconds
    const diffTime = Math.abs(date2.getTime() - date1.getTime());

    // Converting milliseconds to days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}
