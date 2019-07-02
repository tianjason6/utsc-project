import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import styles from './Console.module.css';
import { connect } from 'react-redux';
import ConsoleSideMenu from '../ConsoleSideMenu/ConsoleSideMenu';
import MyProjects from '../MyProjects/MyProjects';
import ConsoleLogout from '../ConsoleLogout/ConsoleLogout';
import ProjectFullDetailEdit from '../ProjectFullDetailEdit/ProjectFullDetailEdit';

class Console extends Component {
  render() {

    return (
      <div className={styles.Content}>
        <ConsoleSideMenu></ConsoleSideMenu>
        <div className={styles.ConsoleDisplay}>
          {
            <Switch>
              <Route path="/test/MyProjects" component={MyProjects} />
              <Route path="/test/ConsoleLogout" component={ConsoleLogout} />
              <Route path="/test/EditMyProjectFullDetail" component={ProjectFullDetailEdit} />
              <Redirect to="/test/MyProjects" />
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