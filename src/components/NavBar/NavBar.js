import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as authActions from "../../store/actions/auth";

import styles from "./NavBar.module.css";

class NavBar extends Component {
  render() {
    console.log("auth: ", this.props.auth);

    return (
      <div className={styles.Background}>
        <div className={styles.Content}>
          <NavLink to={"/"} exact>
            <h1>UTSC Projects</h1>
          </NavLink>
          <div className={styles.NavItemsGroup}>
            <NavLink
              activeClassName={styles.ActiveTab}
              to={"/ViewProjects"}
              exact
            >
              <div className={styles.NavItem}>View Projects</div>
            </NavLink>
            <NavLink activeClassName={styles.ActiveTab} to={"/About"}>
              <div className={styles.NavItem}>About</div>
            </NavLink>

            <NavLink activeClassName={styles.ActiveTab} to={"/ContactUs"}>
              <div className={styles.NavItem}>Contact Us</div>
            </NavLink>

            {this.props.auth.signedIn === false ? (
              <a onClick={this.props.toggleLoginModal}>
                <div className={styles.NavItem}>Login</div>
              </a>
            ) : (
              <NavLink
                className={styles.Account}
                activeClassName={styles.ActiveTab}
                to={"/Console"}
              >
                <p>{this.props.auth.email[0]}</p>
              </NavLink>
            )}
          </div>

          <div className={styles.Burger} onClick={this.props.toggleDrawer}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(NavBar);
