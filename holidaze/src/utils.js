export function prettyDate(dateString) {
    return new Date(dateString).toDateString();
}

export function isEmpty(arr) {
    return arr.length === 0;
}
