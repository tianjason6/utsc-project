import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import styles from './PlayerSelect.module.css';



import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { DESELECT_COLOR } from '../../../store/actions/actionTypes';


class PlayerSelect extends Component {


  constructor(props) {
    super(props);

    this.state = {
      color: 'rgb(223, 223, 223)',
      validColorChosen: false
    }
  }

  handleChange = (e) => {
    let selectedColor = e.target.value;
    if (!this.props.colors[selectedColor]) {

      this.props.selectColor(selectedColor);
      this.setState({ color: selectedColor });
      this.setState({ bgc: selectedColor });

      if (this.state.validColorChosen) {
        this.props.deselectColor(this.state.color);
      }
      else {
        this.state.validColorChosen = true;
      }
    }
    else {
      alert('someone has already chosen that color');
    }

  };

  generateColorOptions = () => {
    return Object.keys(this.props.colors).map((x, index) => {
      return <MenuItem key={index} value={x}>{x}</MenuItem>
    })
  }

  render() {
    console.log(this.props.colors)
    return (
      <div className={styles.Content} style={{ backgroundColor: this.state.color }}>
        Player {this.props.playerId}
        <FormControl>
          <InputLabel id="player">Color</InputLabel>
          <Select
            labelId="player"
            id="playerColor"
            value={this.state.color}
            onChange={this.handleChange}
          >
            {this.generateColorOptions()}
          </Select>
        </FormControl>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    colors: state.selectColorReducer.colors
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // onInitGame: (lobbyName) => dispatch(gameActions.initGame(lobbyName))
    // for now keep it simple, just make it edit the red color
    // for more colors, lets make this function bigger inside of the actions folder
    selectColor: (c) => dispatch({ type: 'SELECT_COLOR', color: c }),
    deselectColor: (c) => dispatch({ type: 'DESELECT_COLOR', color: c })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSelect);