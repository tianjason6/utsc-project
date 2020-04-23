import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ProjectOwnerDetail.module.css";

class ProjectOwnerDetail extends Component {
  render() {
    // all user information in props
    const owner = this.props.user;
    let userData = [];
    // populate userdata
    for (let e in owner) {
      if (
        e !== "isAdmin" &&
        e !== "projectsJoined" &&
        e !== "projectsManaged" &&
        e !== "username"
      ) {
        // to not have email and owner show up if they are the same
        if (e === "email" && owner[e] !== this.props.owner) {
          userData.push(
            <p key={e + "ProjectOwnerDetail"} className={styles.description}>
              <strong>{e}: </strong>
              {owner[e]}
            </p>
          );
        }
      }
    }
    return (
      <div>
        <div className={styles.line}></div>
        <div className={styles.projectOwnerDetail}>
          <h1 className={styles.heading}>Owner Details</h1>
          <p className={styles.description}>
            <strong>Owner:</strong> {this.props.owner}
          </p>
          {userData}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps)(ProjectOwnerDetail);
