import React from "react";
import { connect } from "react-redux";
import { getGuessWord } from "./selectors";

function Inputs({ word }) {
  return (
    <div className="Inputs">
      {word.map((letter, i) => {
        return <span key={i}>{letter}</span>;
      })}
    </div>
  );
}

export default connect(state => ({
  word: getGuessWord(state)
}))(Inputs);
