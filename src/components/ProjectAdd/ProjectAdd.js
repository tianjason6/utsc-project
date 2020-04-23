import React, { Component } from "react";
import { connect } from "react-redux";
import * as projectActions from "../../store/actions/addProject";
import history from "../../history";
import ProjectAddForm from "../ProjectAddForm/ProjectAddForm";

class ProjectAdd extends Component {
  render() {
    if (this.props.authUserEmail == null) {
      alert("Please login to create a project");
      history.push("/Main/myProjects");
    }
    return (
      <div>
        <ProjectAddForm onInitProjectAdd={this.props.onInitProjectAdd} />
      </div>
    );
  }
}

window.onbeforeunload = function () {
  return true;
};

const mapStateToProps = state => {
  return {
    authUserEmail: state.authReducer.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitProjectAdd: (title, description, imgs, authUserEmail) =>
      dispatch(
        projectActions.initProjectAdd(title, description, imgs, authUserEmail)
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);
