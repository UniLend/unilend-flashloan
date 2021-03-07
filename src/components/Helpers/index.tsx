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
