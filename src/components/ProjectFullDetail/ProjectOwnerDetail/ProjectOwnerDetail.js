import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ProjectOwnerDetail.module.css";

class ProjectOwnerDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // gets all users for some reason
    const owner = this.props.user;
    let e = "";
    let userData = [];
    // populate userdata
    for (e in owner) {
      if (
        e !== "isAdmin" &&
        e !== "projectsJoined" &&
        e !== "projectsManaged" &&
        e !== "username"
      ) {
        // to not have email and owner show up if they are the same
        if (e === "email" && owner[e] !== this.props.owner) {
          userData.push(
            <p key={e + "ProjectOwnerDetail"}>
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
        <div className={styles.user}>
          <h1>Owner Details</h1>
          <p>
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
const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOwnerDetail);
