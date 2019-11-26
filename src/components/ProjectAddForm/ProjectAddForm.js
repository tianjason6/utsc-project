import React, { Component } from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import styles from "./ProjectAddForm.module.css";
import RenderImageField from "./ProjectAddImageField";
import * as projectActions from "../../store/actions/addProject";
import { connect } from "react-redux";
import { imgUrl } from "../../firebaseConst.js";

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
    this.updateFile = this.updateFile.bind(this);
  }

  updateFile = (file, id) => {
    this.setState["img" + id] = file;
    console.log("VALUE" + file);
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
      {touched && error && <span>{error}</span>}
    </div>
  );

  ProjectAddForm = values => {
    console.log(values);
    let hasImage = false;
    for (let i = 1; i <= 4; i++) {
      console.log("img" + i + ":" + this.state["img" + i]);
      console.log("BLAH:" + this.state["img" + i]);
      if (this.state["img" + i] !== "") {
        this.state.imgs = this.state.imgs.concat(
          imgUrl + values.title + "%2Fimg" + i + ".jpg?alt=media"
        );
        hasImage = true;
      }
    }
    if (!hasImage) {
      console.log("no image");
      this.state.imgs = [""];
    } else {
      console.log("IMGS" + this.state.imgs);
      this.props.onInitProjectAdd(
        values.title,
        values.description,
        this.state.imgs,
        this.props.authUserEmail
      );
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.ProjectAddForm)}>
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
                  onChange={this.updateFile}
                  id="1"
                />
                <Field
                  component={RenderImageField}
                  onChange={this.updateFile}
                  id="2"
                />
                <Field
                  component={RenderImageField}
                  onChange={this.updateFile}
                  id="3"
                />
                <Field
                  component={RenderImageField}
                  onChange={this.updateFile}
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
