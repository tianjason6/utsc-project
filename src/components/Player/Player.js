import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./player.module.css";
// import { updatePlayerColor } from "../../store/actions/player";
import * as PlayerActions from "../../store/actions/player";

class Player extends Component {
  isEven(playerId) {
    console.log("is even", playerId, "******", playerId % 2);
    // if can get even and odd player working
    // if (playerId % 2 === 0) {
    //   return styles.evenPlayer;
    // } else {
    //   return styles.oddPlayer;
    // }
    if (playerId === 1) {
      return styles.player1;
    } else if (playerId === 2) {
      return styles.player2;
    } else if (playerId === 3) {
      return styles.player3;
    } else if (playerId === 4) {
      return styles.player4;
    }
  }
  render() {
    console.log("in player render props ", this.props);
    const changeColor = e => {
      this.props.updatePlayerColor(this.props.id, e.target.value);
    };

    const playerId = this.props.id;
    const color = this.props.players[playerId].playerColor;
    const newStyle = this.isEven(playerId + 1);

    const returnTrue = () => {
      return true;
    };

    return (
      <div className={newStyle}>
        <br />
        <h2 id={"player" + playerId} style={{ backgroundColor: color }}>
          Player {playerId + 1}
        </h2>
        <select
          onChange={changeColor}
          id={"playerSelection" + playerId}
          defaultValue={color}
          disabled={this.checkColor}
        >
          {/* <option value="#FF0000" disabled={this.props.disabledColors[0]}> */}
          <option value="#FF0000" disabled={returnTrue()}>
            Red
          </option>
          <option value="#FF7F00" disabled={this.props.disabledColors[1]}>
            Orange
          </option>
          <option value="#FFFF00" disabled={this.props.disabledColors[2]}>
            Yellow
          </option>
          <option value="#00FF00" disabled={this.props.disabledColors[3]}>
            Green
          </option>
          <option value="#0000FF" disabled={this.props.disabledColors[4]}>
            Blue
          </option>
          <option value="#4B0082" disabled={this.props.disabledColors[5]}>
            Indigo
          </option>
          <option value="#8B00FF" disabled={this.props.disabledColors[6]}>
            Violet
          </option>
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.playerReducer.players,
    disabledColors: state.playerReducer.usedColors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePlayerColor: (playerId, playerColor) =>
      dispatch(PlayerActions.updatePlayerColor({ playerId, playerColor }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
