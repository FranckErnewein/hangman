import { DICTONARY_LOADED, PICK_WORD, TRY_LETTER } from "./actions";

const intialState = { dictonary: [], word: "", letters: {} };

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
        word: action.word
      };
    case TRY_LETTER:
      const { letter } = action;
      const { letters } = state;
      return {
        ...state,
        letters: {
          ...letters,
          [letter]: true
        }
      };
    default:
      return state;
  }
}
