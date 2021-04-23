/* eslint-disable eqeqeq */
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

export function eToNumber(num: any) {
  var sign = "";
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  (num += "").charAt(0) == "-" && ((num = num.substring(1)), (sign = "-"));
  let arr = num.split(/[e]/gi);
  if (arr.length < 2) return sign + num;
  let dot = (0.1).toLocaleString().substr(1, 1),
    n = arr[0],
    exp = +arr[1];
  let w = (n = n.replace(/^0+/, "")).replace(dot, ""),
    pos = n.split(dot)[1] ? n.indexOf(dot) + exp : w.length + exp,
    L = pos - w.length,
    s = "" + BigInt(w);
  w =
    exp >= 0
      ? L >= 0
        ? s + "0".repeat(L)
        : r()
      : pos <= 0
      ? "0" + dot + "0".repeat(Math.abs(pos)) + s
      : r();
  if (!+w) w = 0;
  return sign + w;
  function r() {
    return w.replace(new RegExp(`^(.{${pos}})(.)`), `$1${dot}$2`);
  }
}
export const floatRegExp = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");

export function toFixed(num: any, fixed: any) {
  fixed = fixed || 0;
  fixed = Math.pow(10, fixed);
  return Math.floor(num * fixed) / fixed;
}

export const setTimestamp = () => {
  var t = new Date();
  return (t.setSeconds(t.getSeconds() - 15) / 1000).toFixed(0);
};

export const copyToClipboard = (address: string) => {
  var textField = document.createElement("textarea");
  textField.innerText = address;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand("copy");
  textField.remove();
};

export const getTransactionHashUrl = (activeNetWork, hash) => {
  let baseURL = `etherscan.io/tx/${hash}`;
  let bscBaseURL = `bscscan.com/tx/${hash}`;
  switch (activeNetWork) {
    case "Mainnet":
      return `https://${baseURL}`;
    case "Binance Testnet":
      return `https://testnet.${bscBaseURL}`;
    case "Binance Mainnet":
      return `https://${bscBaseURL}`;
    default:
      return `https://${activeNetWork.toLowerCase()}.${baseURL}`;
  }
};

export const getAddressUrl = (activeNetWork, hash) => {
  let baseURL = `etherscan.io/address/${hash}`;
  let bscBaseURL = `bscscan.com/address/${hash}`;
  switch (activeNetWork) {
    case "Mainnet":
      return `https://${baseURL}`;
    case "Binance Testnet":
      return `https://testnet.${bscBaseURL}`;
    case "Binance Mainnet":
      return `https://${bscBaseURL}`;
    default:
      return `https://${activeNetWork.toLowerCase()}.${baseURL}`;
  }
};
