export default function getColor(index: number): string {
    const colors = [
        "#8ee000", "#ffc715", "#e53838", "#14d4f4", "#a560e8", "#d33131", "#1cb0f6", "#8549ba", "#faa918", "#7ac70c",
        "#0085c3", "#ce1126", "#f2af00", "#dc5034", "#7ab800", "#009bbb", "#6e2585", "#71c6c1", "#b7295a", "#5482ab",
        "#58595B", "#BDBDBD", "#9B8579", "#0F0B21",
    ]

    if (index > (colors.length - 1)) {
        const matchedIndex = index % (colors.length - 1)
        return colors[matchedIndex]
    } else return colors[index]
}