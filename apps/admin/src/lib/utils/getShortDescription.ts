export default function getShortDescription(description: string, length?: number) {
    const array = description.split(" ")

    const sliceLength = length ? length : 30

    if (array.length >= (sliceLength + 1)) {
        return array.slice(0, sliceLength).join(" ") + "..."
    } else return array.join(" ")
}