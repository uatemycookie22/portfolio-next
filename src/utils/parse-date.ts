export function toDateString(input: string) {
    const date = new Date(Date.parse(input))
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    })
}