export function toDateString(input: string) {
    return new Date(Date.parse(input)).toDateString()
}