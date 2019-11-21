import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ConsoleSideMenu.module.css";
import { NavLink } from "react-router-dom";

class ConsoleSideMenu extends Component {
  render() {
    const isSuperUser = this.props.auth.isAdmin;
    const superUserLink = (
      <NavLink
        className={styles.Option}
        activeClassName={styles.OptionActive}
        to={"/test/JoinedProjects"}
      >
        All Projects
      </NavLink>
    );
    const nonSuperUserLink = [
      <NavLink
        className={styles.Option}
        activeClassName={styles.OptionActive}
        to={"/test/ManagedProjects"}
      >
        Managed Projects
      </NavLink>,
      <NavLink
        className={styles.Option}
        activeClassName={styles.OptionActive}
        to={"/test/JoinedProjects"}
      >
        Joined Projects
      </NavLink>
    ];
    console.log(this.props, "in console side menu");
    return (
      <div className={styles.Content}>
        <NavLink
          className={styles.Option}
          activeClassName={styles.OptionActive}
          to={"/test/TimeLine"}
        >
          Timeline
        </NavLink>
        {isSuperUser === false ? nonSuperUserLink : superUserLink}
        <NavLink
          className={styles.Option}
          activeClassName={styles.OptionActive}
          to={"/test/ConsoleLogout"}
        >
          Logout
        </NavLink>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(
  ConsoleSideMenu
);
