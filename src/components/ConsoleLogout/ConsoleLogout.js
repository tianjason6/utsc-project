import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ConsoleLogout.module.css';

class ConsoleLogout extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <div className={styles.Center}>
          <p className={styles.LogoutMessage}>Are you sure you want to Log out?</p>
          <button className={styles.Confirm}>Yes, continue to Log Out</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(ConsoleLogout);