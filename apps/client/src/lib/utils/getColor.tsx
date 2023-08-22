export default function getColor(index: number): string {
    const colors = [
        "#7ac70c", "#8ee000", "#faa918", "#ffc715", "#d33131", "#e53838", "#1cb0f6", "#14d4f4", "#8549ba", "#a560e8", "#f0f0f0",
        "#0085c3", "#7ab800", "#f2af00", "#dc5034", "#ce1126", "#b7295a", "#6e2585", "#71c6c1", "#5482ab", "#009bbb",
        "#58595B", "#9B8579", "#BDBDBD", "#0F0B21",
    ]

    if (index > (colors.length - 1)) {
        const matchedIndex = index % (colors.length - 1)
        return colors[matchedIndex]
    } else return colors[index]
}