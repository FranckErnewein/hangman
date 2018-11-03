import _ from "lodash";
import { loadDictonary } from "./service";

export const DICTONARY_LOADED = "DICTONARY_LOADED";
export const PICK_WORD = "PICK_WORD";
export const TRY_LETTER = "TRY_LETTER";

export function loadData() {
  return dispatch => {
    return loadDictonary().then(dictonary => {
      dispatch({
        type: DICTONARY_LOADED,
        dictonary
      });
    });
  };
}

export function pickWord() {
  return (dispatch, getState) => {
    dispatch({
      type: PICK_WORD,
      word: _.shuffle(getState().dictonary)[0]
    });
  };
}

export function tryLetter(letter) {
  return (dispatch, getState) => {
    const { letters } = getState();
    if (!letter) return;
    const char = letter.toLowerCase();
    if (!letters[char]) {
      dispatch({
        type: TRY_LETTER,
        letter
      });
    }
  };
}
