export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.substring(1);

export const searchWord = (text: string, word: string) =>
  text
    ? text
        .trim()
        .toLowerCase()
        .search(
          word
            .replace(/[*+?^${}()|[\]\\]/g, "\\$&")
            .trim()
            .toLowerCase()
        ) >= 0
    : false;

export function shortenAddress(address: string, chars = 4): any {
  if (address) {
    const parsed = address;
    // if (!parsed) {
    //   throw Error(`Invalid 'address' parameter '${address}'.`)
    // }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(
      42 - chars
    )}`;
  }
}

export function toDecimalPlace(n: any, d: any) {
  if (n.toString().indexOf(".") > -1) {
    var arr = n.toString().split(".");
    return arr[0] + "." + arr[1].substring(0, d);
  } else {
    return n;
  }
}
