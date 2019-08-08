import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, withHandlers } from "recompose";
import { createStructuredSelector } from "reselect";
import { tryLetter } from "./actions";
import { getLetters } from "./selectors";

function GuessLetter({ keyUp }) {
  return (
    <div className="GuessLetter">
      Guess a letter: <br />
      <input type="text" onKeyUp={keyUp} maxLength={1} />
    </div>
  );
}

export default compose(
  connect(
    state =>
      createStructuredSelector({
        letters: getLetters
      }),
    dispatch =>
      bindActionCreators(
        {
          tryLetter
        },
        dispatch
      )
  ),
  withHandlers({
    keyUp: ({ tryLetter, letters }) => e => {
      const { value } = e.target;
      if (value) {
        tryLetter(value);
        e.target.value = "";
      }
    }
  })
)(GuessLetter);
