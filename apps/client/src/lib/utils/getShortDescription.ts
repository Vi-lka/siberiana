export default function getShortDescription(description: string) {
    const array = description.split(" ")
    if (array.length >= 31) {
        return array.slice(0, 30).join(" ") + "..."
    } else return array.join(" ")
}