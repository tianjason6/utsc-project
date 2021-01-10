import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ConsoleSideMenu.module.css";
import { NavLink } from "react-router-dom";

class ConsoleSideMenu extends Component {
  render() {
    let isSuperUser = undefined;
    if (this.props.currUser.loggedInUser !== null) {
      isSuperUser = this.props.currUser.loggedInUser.isAdmin;
    }
    const superUserLink = (
      <NavLink
        className={styles.Option}
        activeClassName={styles.OptionActive}
        to={"/Main/AllProjects"}
      >
        All Projects
      </NavLink>
    );
    const nonSuperUserLink = [
      <NavLink
        key={"navLink1"}
        className={styles.Option}
        activeClassName={styles.OptionActive}
        to={"/Main/ManagedProjects"}
      >
        Managed Projects
      </NavLink>,
      <NavLink
        key={"navLink2"}
        className={styles.Option}
        activeClassName={styles.OptionActive}
        to={"/Main/JoinedProjects"}
      >
        Joined Projects
      </NavLink>,
    ];
    return (
      <div className={styles.Content}>
        <NavLink
          className={styles.Option}
          activeClassName={styles.OptionActive}
          to={"/Main/TimeLine"}
        >
          Timeline
        </NavLink>
        {isSuperUser === false ? nonSuperUserLink : superUserLink}
        <NavLink
          className={styles.Option}
          activeClassName={styles.OptionActive}
          to={"/Main/ConsoleLogout"}
        >
          Logout
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
    currUser: state.loggedInUserReducer,
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(ConsoleSideMenu);
