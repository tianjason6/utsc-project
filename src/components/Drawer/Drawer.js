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
            {this.props.auth.signedIn === false ? (
              <a onClick={loginOnClick}>
                <div className={styles.NavItem}>Login</div>
              </a>
            ) : (
              <NavLink onClick={this.props.closeDrawer} to={"/Console"}>
                Console
              </NavLink>
            )}
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
            <NavLink activeClassName={styles.ActiveTab} to={"/TestPage"}>
              Whale Fact
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}

// const Drawer = (props) => {
//   let attachedClasses = [styles.Drawer, styles.Close];
//   if (props.isOpen) {
//       attachedClasses = [styles.Drawer, styles.Open];
//   }

//   const loginOnClick = () => {
//     props.closeDrawer();
//     props.toggleLoginModal();
//   }
//   return (
//     <>
//       {props.isOpen ? <div className={styles.Background} onClick={props.closeDrawer}></div> : null}
//       <div className={attachedClasses.join(' ')}>
//         <div className={styles.ItemsGroup}>
//           <NavLink onClick={props.closeDrawer} to={'/ViewProjects'} exact>View Projects</NavLink>
//           <NavLink onClick={props.closeDrawer} to={'/About'}>About</NavLink>
//           <NavLink onClick={props.closeDrawer} to={'/ContactUs'}>Contact Us</NavLink>
//           <a onClick={loginOnClick}>Login</a>
//         </div>
//       </div>
//     </>
//   )
// }
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
)(Drawer);
