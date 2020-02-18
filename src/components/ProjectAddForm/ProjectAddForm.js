import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import styles from "./ProjectAddForm.module.css";
import RenderImageField from "./ProjectAddImageField";
import * as projectActions from "../../store/actions/addProject";
import { connect } from "react-redux";
import axios from "../../axios-projects";
import firebase from "firebase";
import { firebaseConfig, maxFileSize, imgUrl } from "../../firebaseConst.js";

class ProjectAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUserEmail: "",
      imgs: [],
      img1: "",
      img2: "",
      img3: "",
      img4: ""
    };
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.config = this.config.bind(this);
  }

  fileUploadHandler(title) {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let ref, file;
    let index = 1;
    this.state.imgs.map(item => {
      if (item !== "") {
        file = this.state["img" + index];
        ref = storageRef.child(title + "/img" + index + ".jpg");
        ref.put(file);
      }
      index++;
    });
  }

  updateFile1 = (file, id) => {
    this.setState({ img1: file });
  };

  updateFile2 = (file, id) => {
    this.setState({ img2: file });
  };

  updateFile3 = (file, id) => {
    this.setState({ img3: file });
  };

  updateFile4 = (file, id) => {
    this.setState({ img4: file });
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      {label === "Project Name" ? (
        <div className={styles.TitleImgs}>
          <input {...input} placeholder={label} type={type} maxLength="25" />
        </div>
      ) : (
        <textarea
          className={styles.Description}
          {...input}
          placeholder={label}
          type={type}
        />
      )}
    </div>
  );

  config(event) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  ProjectAddForm = values => {
    let projectData = null;
    // Fetching the project names
    axios.get("Projects/" + values.title + ".json").then(res => {
      projectData = res.data;
      if (projectData != null) {
        // If project does not exist, put request
        alert("A project with this name already exists");
      } else {
        let hasImage = false;
        for (let i = 1; i <= 4; i++) {
          if (this.state["img" + i] !== "") {
            this.state.imgs = this.state.imgs.concat(
              imgUrl + values.title + "%2Fimg" + i + ".jpg?alt=media"
            );
            hasImage = true;
          }
        }

        if (!hasImage) {
          this.state.imgs = [""];
          alert("A project image is required!");
        } else {
          this.fileUploadHandler(values.title);

          this.props.onInitProjectAdd(
            values.title,
            values.description,
            this.state.imgs,
            this.props.authUserEmail
          );
        }
      }
    });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.ProjectAddForm)}>
        {this.config()}

        <div className={styles.Content}>
          <Field
            name="title"
            type="text"
            component={this.renderField}
            label="Project Name"
          />

          <div className={styles.TitleImgs}>
            <span>
              <div className={styles.imgSelect}>
                <Field
                  name="imgs"
                  component={RenderImageField}
                  onChange={this.updateFile1}
                  id="1"
                />
                <Field
                  component={RenderImageField}
                  onChange={this.updateFile2}
                  id="2"
                />
                <Field
                  component={RenderImageField}
                  onChange={this.updateFile3}
                  id="3"
                />
                <Field
                  component={RenderImageField}
                  onChange={this.updateFile4}
                  id="4"
                />
                <div className={styles.containerSmall}></div>
              </div>
            </span>
          </div>

          <h1>Description</h1>

          <span>
            <Field
              name="description"
              type="text"
              component={this.renderField}
              label="Enter a description for your project and describe any open positions."
            />
          </span>

          {this.props.error && <strong>{this.props.error}</strong>}
          <button className={styles.ViewProject} type="submit">
            Add Project
          </button>
        </div>
      </form>
    );
  }
}
const validate = values => {
  let error = {};
  let isError = false;

  if (!("title" in values)) {
    error.title = "Required";
    isError = true;
  }

  if (!("description" in values)) {
    error.description = "Required";
    isError = true;
  }
  return error;
};

ProjectAddForm = reduxForm({
  // a unique name for the form
  form: "ProjectAddForm",
  validate
})(ProjectAddForm);

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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAddForm);
