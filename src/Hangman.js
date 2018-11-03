import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose, withHandlers } from "recompose";
import { createStructuredSelector } from "reselect";
import { MAX_ERROR } from "./const";
import { tryLetter } from "./actions";
import ascii from "./ascii";
import { getUsedLetters, getErrors } from "./selectors";

function Hangman({ error, letters, onClickLetter }) {
  return (
    <div className="Hangman">
      <pre>{ascii[error]}</pre>
      <div>
        {letters.map((letter, i) => (
          <span
            key={i}
            className={
              letter.error ? "error" : letter.valid ? "valid" : "normal"
            }
            onClick={onClickLetter(letter.letter)}
          >
            {letter.letter}
          </span>
        ))}
      </div>
      {error > 0 ? (
        <div>
          Error
          {error > 1 ? "s" : ""}: {error} / {MAX_ERROR}
        </div>
      ) : null}
    </div>
  );
}

export default compose(
  connect(
    state =>
      createStructuredSelector({
        error: getErrors,
        letters: getUsedLetters
      }),
    dispatch => bindActionCreators({ tryLetter }, dispatch)
  ),
  withHandlers({
    onClickLetter: ({ tryLetter }) => letter => () => {
      tryLetter(letter);
    }
  })
)(Hangman);
