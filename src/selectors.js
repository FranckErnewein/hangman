import { createSelector } from "reselect";
import { ALPHABET, MAX_ERROR } from "./const";

export const getLetters = state => state.letters;
export const getWord = state => state.word;

export const getLettersAsArray = createSelector(getLetters, letters => {
  return Object.keys(letters).sort();
});

export const getUsedLetters = createSelector(
  [getLetters, getWord],
  (letters, word) =>
    ALPHABET.map(letter => ({
      letter,
      error: !!letters[letter] && word.indexOf(letter) === -1,
      valid: !!letters[letter] && word.indexOf(letter) > -1
    }))
);

export const getErrors = createSelector(
  [getLettersAsArray, getWord],
  (letters, word) =>
    letters.filter(letter => word.indexOf(letter) === -1).length
);

export const getGuessWord = createSelector(
  [getWord, getLetters],
  (word, letters) =>
    word.split("").map(letter => (letters[letter] ? letter : "_"))
);

export const isWon = createSelector(
  [getWord, getGuessWord],
  (word, guessWord) => word === guessWord.join("")
);
export const isLost = createSelector(
  [getErrors],
  errors => errors === MAX_ERROR
);
