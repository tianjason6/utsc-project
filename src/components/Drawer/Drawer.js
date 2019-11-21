import React, { Component } from "react";
import styles from "./Drawer.module.css";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as authActions from "../../store/actions/auth";

class Drawer extends Component {
  render() {
    let attachedClasses = [styles.Drawer, styles.Close];
    if (this.props.isOpen) {
      attachedClasses = [styles.Drawer, styles.Open];
    }

    const loginOnClick = () => {
      this.props.closeDrawer();
      this.props.toggleLoginModal();
    };

    const logoutOnClick = () => {
      this.props.closeDrawer();
      this.props.logout();
    };
    const loggedIn = [
      <div className={styles.title}>User Menu</div>,
      <div className={styles.separator} />,
      <NavLink onClick={this.props.closeDrawer} to={"/Console"}>
        Console
      </NavLink>,
      <NavLink onClick={this.props.closeDrawer} to={"/test/TimeLine"}>
        Timeline
      </NavLink>,
      <NavLink onClick={this.props.closeDrawer} to={"/test/ManagedProjects"}>
        Managed Projects
      </NavLink>,
      <NavLink onClick={this.props.closeDrawer} to={"/test/JoinedProjects"}>
        Joined Projects
      </NavLink>,
      <NavLink onClick={this.props.closeDrawer} to={"/test/ConsoleLogout"}>
        Logout
      </NavLink>
    ];
    return (
      <>
        {this.props.isOpen ? (
          <div
            className={styles.Background}
            onClick={this.props.closeDrawer}
          ></div>
        ) : null}
        <div className={attachedClasses.join(" ")}>
          <div className={styles.ItemsGroup}>
            <div className={styles.mainTitle}>Main Menu</div>
            <div className={styles.separator} />
            <NavLink
              onClick={this.props.closeDrawer}
              to={"/ViewProjects"}
              exact
            >
              View Projects
            </NavLink>
            <NavLink onClick={this.props.closeDrawer} to={"/About"}>
              About
            </NavLink>
            <NavLink onClick={this.props.closeDrawer} to={"/ContactUs"}>
              Contact Us
            </NavLink>
            {this.props.auth.signedIn === false ? (
              <a onClick={loginOnClick}>
                <div className={styles.NavItem}>Login</div>
              </a>
            ) : (
              loggedIn
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(Drawer);
