import React from "react";
import { connect } from "react-redux";
import ascii from "./ascii";

function Hangman({ error, letters }) {
  return (
    <div className="Hangman">
      {error > 0 ? (
        <div>
          Error
          {error > 1 ? "s" : ""}: {error}
          <div>
            {Object.keys(letters)
              .sort()
              .map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
          </div>
        </div>
      ) : null}
      <pre>{ascii[error]}</pre>
    </div>
  );
}

export default connect(({ error, letters }) => ({ error, letters }))(Hangman);
