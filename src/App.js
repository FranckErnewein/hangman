import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, lifecycle } from "recompose";
import { loadData, pickWord } from "./actions";
import Inputs from "./Inputs";
import GuessLetter from "./GuessLetter";
import Hangman from "./Hangman";
import "./App.css";

function App({ dictonary, pickWord, word, fail, win }) {
  return (
    <div className="App">
      <h1>Hangman</h1>
      <button onClick={pickWord}>START NEW GAME</button>
      {fail && <h1>LOOOOOOOOSER: {word}</h1>}
      {win && <h1>WINNNNNER!!!</h1>}
      {word && <Inputs />}
      {word && <GuessLetter />}
      {word && <Hangman />}
    </div>
  );
}

export default compose(
  connect(
    state => ({
      dictonary: state.dictonary,
      word: state.word,
      fail: state.fail,
      win: state.win
    }),
    dispatch =>
      bindActionCreators(
        {
          loadData,
          pickWord
        },
        dispatch
      )
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadData().then(() => {
        this.props.pickWord();
      });
    }
  })
)(App);
