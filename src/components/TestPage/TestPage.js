import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "../Player/Player";
import styles from "./TestPage.module.css";

class Game extends Component {
  render() {
    console.log("The Game", this.props);
    const gamePlayers = this.props.players;
    return (
      <div
        className={styles.game}
        src="http://www.zoomontana.org/media/14893381252_071bac9777_b-1024x683.jpg"
      >
        <h1>Game Lobby</h1>
        <div className={styles.game.player1}>
          <Player
            id={gamePlayers[0].playerId}
            playerColor={gamePlayers[0].playerColor}
          />
        </div>

        <Player
          id={gamePlayers[1].playerId}
          playerColor={gamePlayers[1].playerColor}
        />
        <Player
          id={gamePlayers[2].playerId}
          playerColor={gamePlayers[2].playerColor}
        />
        <Player
          id={gamePlayers[3].playerId}
          playerColor={gamePlayers[3].playerColor}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.playerReducer.players
  };
};

export default connect(mapStateToProps)(Game);
