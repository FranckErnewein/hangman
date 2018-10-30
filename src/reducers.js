import { DICTONARY_LOADED, PICK_WORD, TRY_LETTER } from "./actions";

const MAX_ERROR = 10;

const intialState = { fail: false, win: false, error: 0, letters: {} };

export default function reducer(state = intialState, action) {
  const { type } = action;
  switch (type) {
    case DICTONARY_LOADED:
      return {
        ...state,
        dictonary: action.dictonary
      };
    case PICK_WORD:
      return {
        ...intialState,
        dictonary: state.dictonary,
        word: action.word,
        guessWord: action.word.split("").map(() => "_")
      };
    case TRY_LETTER:
      const { word, guessWord, error, letters } = state;
      const { letter } = action;
      const index = word.indexOf(letter);
      if (index === -1) {
        const newError = error + 1;
        return {
          ...state,
          error: newError,
          letters: {
            ...letters,
            [letter]: true
          },
          fail: newError > MAX_ERROR - 1
        };
      } else {
        const newGuessWord = guessWord.map((char, i) => {
          if (char !== "_") return char;
          return word[i] === letter ? letter : "_";
        });

        return {
          ...state,
          guessWord: newGuessWord,
          win: newGuessWord.join("") === word
        };
      }
    default:
      return state;
  }
}
