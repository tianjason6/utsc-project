import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import styles from './Console.module.css';
import { connect } from 'react-redux';
import ConsoleSideMenu from '../ConsoleSideMenu/ConsoleSideMenu';
import ManagedProjects from '../ManagedProjects/ManagedProjects';
import ConsoleLogout from '../ConsoleLogout/ConsoleLogout';
import JoinedProjects from '../JoinedProjects/JoinedProjects';

class Console extends Component {
  render() {

    return (
      <div className={styles.Content}>
        <ConsoleSideMenu></ConsoleSideMenu>
        <div className={styles.ConsoleDisplay}>
          {
            <Switch>
              <Route path="/test/ManagedProjects" component={ManagedProjects} />
              <Route path="/test/JoinedProjects" component={JoinedProjects} />
              <Route path="/test/ConsoleLogout" component={ConsoleLogout} />
              <Route path="/test/EditMyProjectFullDetail" component={ConsoleLogout} />
              <Redirect to="/test/ManagedProjects" />
            </Switch>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(Console);