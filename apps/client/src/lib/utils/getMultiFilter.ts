export default function getMultiFilter(string: string) {
  let filter = "";

  const arrayFormString = string.split("_");

  arrayFormString.forEach((filterString) => {
    filter = filter + `"${filterString}",`;
  });

  return filter;
}
