export default function getMultiFilter(string: string) {
    let filter = ""

    const arrayFormString = string.split('|')

    arrayFormString.forEach(filterString => {
      filter = filter + `"${filterString}",`
    })

    return filter
}