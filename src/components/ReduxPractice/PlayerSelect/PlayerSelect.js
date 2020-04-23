import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import styles from './PlayerSelect.module.css';



import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { DESELECT_COLOR } from '../../../store/actions/actionTypes';
import * as playerActions from "../../../store/actions/selectPlayer";

const mapColors = {
  'red': styles.Red,
  'orange': styles.Orange,
  'yellow': styles.Yellow,
  'green': styles.Green,
  'blue': styles.Blue,
  'indigo': styles.Indigo,
  'violet': styles.Violet,
  '': styles.DefaultColor
}

class PlayerSelect extends Component {


  constructor(props) {
    super(props);
  }


  handleChange = (e) => {
    let selectedColor = e.target.value;
    this.props.selectColor(this.props.playerId, selectedColor);

  };

  generateColorOptions = () => {
    // create an array of the colors already selected by players
    // note we remove the current players selection, because we want that to be displayed in the color
    // options
    let playerChoices = Object.values({ ... this.props.players, [this.props.playerId]: '' });

    let availableColors = this.props.colors.filter((x) => !playerChoices.includes(x));
    return availableColors.map((x, index) => {
      return <MenuItem key={index} value={x}>{x}</MenuItem>
    })
  }

  getPlayerColor = () => {
    return this.props.players[this.props.playerId];
  }


  render() {
    let playerColor = this.getPlayerColor();
    return (
      <div className={[styles.Content, mapColors[playerColor]].join(' ')}>
        Player {this.props.playerId}
        <InputLabel id="player">Color</InputLabel>
        <Select
          labelId={["player", this.props.playerId].join('')}
          id={["playerColor", this.props.playerId].join('')}
          value={playerColor}
          onChange={this.handleChange}
        >
          {this.generateColorOptions()}
        </Select>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    colors: state.selectColorReducer.colors,
    players: state.selectColorReducer.players
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // onInitGame: (lobbyName) => dispatch(gameActions.initGame(lobbyName))
    // for now keep it simple, just make it edit the red color
    // for more colors, lets make this function bigger inside of the actions folder
    selectColor: (playerId, color) => dispatch(playerActions.playerSelectColor(playerId, color)),
    deselectColor: (c) => dispatch({ type: 'DESELECT_COLOR', color: c })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSelect);