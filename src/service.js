import rp from "request-promise";
import _ from "lodash";

export function loadDictonary() {
  return rp("http://localhost:3000/dictionary.txt").then(text => {
    const rawWords = _.words(text);
    const only5lettersMin = rawWords.filter(word => word.length > 5);
    const lowerCase = only5lettersMin.map(word => word.toLowerCase());
    const onlyLetters = lowerCase.filter(word => /^[a-z]+$/.test(word));
    const result = _.uniq(onlyLetters);
    return result;
  });
}
