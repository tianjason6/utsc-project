import React, { Component } from "react";

import { reduxForm, Field } from "redux-form";

import styles from "./AddTimelineForm.module.css";
import RenderFileField from "../../FieldFileInput/FieldFileInput";

import firebase from "firebase/app";
import { connect } from "react-redux";

import * as timelineAction from "../../../store/actions/timeline";

class AddTimelineForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: null,
      attachmentURL: null,
    };
    this.config = this.config.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  renderField = ({ input, meta, label, type, name, accept, className }) => (
    <div
      className={[
        styles.formItem,
        meta.error && meta.touched ? styles.error : "",
      ].join(" ")}
    >
      <label>{label}</label>
      {type !== "file" ? (
        label === "Content" ? (
          <textarea
            className={className}
            {...input}
            name={name}
            type={type}
            rows="1"
          >
            testing
          </textarea>
        ) : (
          <input className={className} {...input} name={name} type={type} />
        )
      ) : (
        <input className={className} name={name} type={type} accept={accept} />
      )}
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </div>
  );
  onChange = (event) => {
    this.setState({ fileBlob: event });
  };

  //********************************************************* */
  config(event) {
    var firebaseConfig = {
      apiKey: "AIzaSyDICnZMnrvISneUWxo-WfyjCbRj5CMuC2Y",
      authDomain: "utsc-projects.firebaseapp.com",
      databaseURL: "https://utsc-projects.firebaseio.com",
      projectId: "utsc-projects",
      storageBucket: "utsc-projects.appspot.com",
      messagingSenderId: "109791671007",
      appId: "1:109791671007:web:23cdd1c32c44ea59bd6f6a",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  fileUploadHandler = (id) => {
    const storageRef = firebase.storage().ref();

    const timelineRef = storageRef.child("timeline/" + id);

    timelineRef.put(this.state.fileBlob).then((snapshot) => {});
  };

  submitForm = (values) => {
    // manually setting up the time in 00:00am format
    // if there is a better way then let me know
    const currentTime = new Date();
    //using milliseconds of the current time as a unique identifer for timeline post and image
    const uniqueId = currentTime.getTime();

    const postDate =
      "" +
      currentTime.getFullYear() +
      "/" +
      (currentTime.getMonth() + 1) +
      "/" +
      currentTime.getDate();
    let postTime = "";
    let amPm = "pm";
    if (currentTime.getHours() < 13) {
      currentTime.getHours() === 0
        ? (postTime += "12")
        : (postTime += currentTime.getHours());
      amPm = "am";
    } else {
      postTime += currentTime.getHours() - 12;
    }
    //had to check this because I tried checking at 12am and it was doing 0:4 (should be 12:04)
    postTime.length === 1 && (postTime = "0" + postTime);
    ("" + currentTime.getMinutes()).length === 1
      ? (postTime = postTime + ":0" + currentTime.getMinutes())
      : (postTime += ":" + currentTime.getMinutes());
    postTime += amPm;

    this.state.fileBlob && this.fileUploadHandler(uniqueId);

    this.props.addToTimeline(
      postDate,
      postTime,
      this.props.loggedInUser.username,
      values,
      uniqueId,
      this.state.fileBlob
    );
    // window.location.reload();
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        className={styles.background}
        onSubmit={handleSubmit(this.submitForm)}
      >
        {this.config()}
        <h3 className={styles.banner}>
          Post a new timeline item! (Admin Feature)
        </h3>

        <Field
          name="title"
          component={this.renderField}
          type="text"
          label="Title"
          className={styles.title}
        />
        <Field
          name="content"
          component={this.renderField}
          type="text"
          label="Content"
          className={styles.content}
        />
        <Field
          name="attachment"
          component={RenderFileField}
          type="file"
          label="Add an image!"
          onChange={this.onChange}
          className={styles.chooseFile}
        />
        <button className={styles.button} type="submit">
          Post to Timeline
        </button>
      </form>
    );
  }
}
const validate = (values) => {
  const errors = {};
  if (!values.content) {
    errors.content = "required";
  }

  if (!values.title) {
    errors.title = "required";
  }

  return errors;
};

AddTimelineForm = reduxForm({
  form: "AddTimeline",
  destroyOnUnmount: false,
  validate,
})(AddTimelineForm);

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUserReducer.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToTimeline: (date, time, username, content, id, file) =>
      dispatch(
        timelineAction.addToTimeline(date, time, username, content, id, file)
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTimelineForm);
