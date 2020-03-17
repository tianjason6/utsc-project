import React, { Component } from 'react';
import styles from './ReduxProject.module.css';
import Dropdown from 'react-dropdown';

class ReduxProject extends Component {

  componentDidMount() {
    this.props.onInitColors()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allIds !== this.props.allIds) {
      const initColors = this.props.allIds.slice(0, 4);
      this.props.onInitPlayerColors(initColors);
      for (let color of initColors) {
        this.props.onUpdateSelected(color);
      }
    }
  }

  getPlayerOptions(byId, allIds) {
    let options = [];
    for (let id of allIds) {
      if (!byId[id].selected) {
        options.push({value: byId[id].id, label: byId[id].id});
      }
    }
    return options
  }
  
  handleChange(player, newColor) {
    this.props.onChangeSelected(player.color, newColor);
    this.props.onChangePlayerColors(player, newColor);
  }

  render() {
    const { players, byId, allIds } = this.props;
    return (
      <div className={styles.Background}>
        <div className={styles.Container}>
          <div className={styles.PlayersBox}>
            <h1 className={styles.Title}>Game Lobby</h1>
            <div className={styles.PlayerBoxContainer}>
              {players.map((player, key) => (
                <div className={styles.PlayerBox} key={key}>
                  <span>{player.name}</span>
                  <Dropdown options={this.getPlayerOptions(byId, allIds)} onChange={(newColor) => this.handleChange(player, newColor.value)}
                   value={player.color} placeholder="Select an option" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReduxProject;