import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "../../../store/actions/user";
import styles from "./ProjectOwnerDetail.module.css";

class ProjectOwnerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: ""
    };
  }

  // get user from database
  componentDidMount() {
    console.log("project owner detail did mount ", this.props.owner);
    this.setState({ owner: this.props.owner });
    this.props.getUser(this.state.owner);
  }

  render() {
    console.log("in project owner detail ", this.props);
    console.log("state of owner details ", this.state);
    // gets all users for some reason
    const owner = this.props.user[this.props.owner];
    let e = "";
    let userData = [];
    // populate userdata and add title if necessary
    for (e in owner) {
      if (
        e !== "isAdmin" &&
        e !== "projectsJoined" &&
        e !== "projectsManaged" &&
        e !== "username"
      ) {
        console.log("element in owner ", owner[e]);
        userData.push(
          <p>
            <strong>{e}: </strong>
            {owner[e]}
          </p>
        );
      }
    }
    console.log("data of owner ", userData);
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
const mapDispatchToProps = dispatch => {
  return {
    getUser: username => dispatch(userActions.fetchUser(username))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectOwnerDetail);
