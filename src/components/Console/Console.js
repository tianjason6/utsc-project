import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import styles from './Console.module.css';
import { connect } from 'react-redux';
import ConsoleSideMenu from '../ConsoleSideMenu/ConsoleSideMenu';
import ManagedProjects from '../ManagedProjects/ManagedProjects';
import ConsoleLogout from '../ConsoleLogout/ConsoleLogout';
import JoinedProjects from '../JoinedProjects/JoinedProjects';
import Timeline from '../Timeline/Timeline';
import AllProjects from '../AllProjects/AllProjects';
import RouteError from '../RouteError/RouteError';

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
              <Route path="/test/AllProjects" component={AllProjects} />
              <Route path="/test/ConsoleLogout" component={ConsoleLogout} />
              <Route path="/test/EditMyProjectFullDetail" component={ConsoleLogout} />
              <Route path='/test/Timeline' component={Timeline} />

              <Redirect to="/test/Timeline" />
            </Switch>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUserReducer.loggedInUser
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(Console);