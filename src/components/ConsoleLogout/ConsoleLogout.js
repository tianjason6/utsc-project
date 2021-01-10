import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ConsoleLogout.module.css';
import  * as authActions from '../../store/actions/auth';

class ConsoleLogout extends Component {
  
  render() {
    return (
      <div className={styles.Content}>
        <div className={styles.Center}>
          <p className={styles.LogoutMessage}>Are you sure you want to Log out?</p>
          <button className={styles.Confirm} onClick={this.props.authLogout}>Yes, continue to Log Out</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};
const mapDispatchToProps = dispatch => {
  return {
    authLogout: () => dispatch(authActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(ConsoleLogout);