import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ConsoleSideMenu.module.css";
import { NavLink } from "react-router-dom";

class ConsoleSideMenu extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <NavLink
          className={styles.Option}
          activeClassName={styles.OptionActive}
          to={"/test/TimeLine"}
        >
          Timeline
        </NavLink>
        <NavLink
          className={styles.Option}
          activeClassName={styles.OptionActive}
          to={"/test/ManagedProjects"}
        >
          Managed Projects
        </NavLink>
        <NavLink
          className={styles.Option}
          activeClassName={styles.OptionActive}
          to={"/test/JoinedProjects"}
        >
          Joined Projects
        </NavLink>
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
  return {};
};

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(ConsoleSideMenu);
