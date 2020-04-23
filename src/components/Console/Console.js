import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import styles from "./Console.module.css";
import { connect } from "react-redux";
import ConsoleSideMenu from "../ConsoleSideMenu/ConsoleSideMenu";
import ManagedProjects from "../ManagedProjects/ManagedProjects";
import ConsoleLogout from "../ConsoleLogout/ConsoleLogout";
import ProjectFullDetailEdit from "../ProjectFullDetailEdit/ProjectFullDetailEdit";
import ProjectAdd from "../ProjectAdd/ProjectAdd";
import JoinedProjects from "../JoinedProjects/JoinedProjects";
import Timeline from "../Timeline/Timeline";
import AllProjects from "../AllProjects/AllProjects";
import RouteError from "../RouteError/RouteError";

class Console extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <ConsoleSideMenu></ConsoleSideMenu>
        <div className={styles.ConsoleDisplay}>
          {
            <Switch>
              <Route path="/Main/ProjectAdd" component={ProjectAdd} />
              <Route path="/Main/ManagedProjects" component={ManagedProjects} />
              <Route path="/Main/JoinedProjects" component={JoinedProjects} />
              <Route path="/Main/AllProjects" component={AllProjects} />
              <Route path="/Main/ConsoleLogout" component={ConsoleLogout} />
              <Route
                path="/Main/EditMyProjectFullDetail"
                component={ProjectFullDetailEdit}
              />
              <Route path="/Main/Timeline" component={Timeline} />
              <Redirect to="/Main/Timeline" />
            </Switch>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.loggedInUserReducer.loggedInUser
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(Console);
