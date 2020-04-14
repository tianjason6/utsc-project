import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ReduxPractice.module.css';
import PlayerSelect from './PlayerSelect/PlayerSelect';

class ReduxPractice extends React.Component {

  render() {
    // let style = { top }
    const numPlayers = 4;
    const players = [];
    for (let i = 0; i < numPlayers; i++) {
      players.push(<PlayerSelect key={i} playerId={i + 1} />)
    }
    return (
      // <div style={{ margin: '100px' }}>
      <div className={styles.Content}>
        <div className={styles.Lobby}>
          <h1>
            Game Lobby
        </h1>
          <div className={styles.playerContainer}>
            <div className={styles.playerRow}>
              <PlayerSelect playerId={1} />
              <PlayerSelect playerId={2} />
            </div>
            <div className={styles.playerRow}>
              <PlayerSelect playerId={3} />
              <PlayerSelect playerId={4} />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    state
  };
};

export default connect(mapStateToProps)(ReduxPractice)
