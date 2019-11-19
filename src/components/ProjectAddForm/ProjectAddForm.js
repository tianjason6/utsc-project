import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import styles from "./ProjectAddForm.module.css";

let ProjectAddForm = props => {
  const { handleSubmit } = props;

  const submit = values => {
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

    if (isError) {
      throw new SubmissionError(error);
    } else {
      console.log("Valid Submission");
      console.log(values);
      props.onInitAddProject(
        values.title,
        values.description,
        values.imgs,
        values.authUserEmail
      );
    }
  };

  const renderField = ({ input, label, type, meta: { touched, error } }) => (
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

  const renderImageField = ({ id, meta: { touched, error } }) => (
    <div>
      {
        <div className={styles.containerSmall}>
          <img className={styles.imgItem} alt=""></img>
          <input
            type="file"
            className={styles.imgItem}
            accept="image/*"
          ></input>
          <h3>Upload Image</h3>
        </div>
      }
      {touched && error && <span>{error}</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className={styles.Content}>
        <Field
          name="title"
          type="text"
          component={renderField}
          label="Project Name"
        />

        <div className={styles.TitleImgs}>
          <span>
            <div className={styles.imgSelect}>
              <Field component={renderImageField} id="1" />
              <Field component={renderImageField} id="2" />
              <Field component={renderImageField} id="3" />
              <Field component={renderImageField} id="4" />
              <div className={styles.containerSmall}></div>
            </div>
          </span>
        </div>

        <h1>Description</h1>

        <span>
          <Field
            name="description"
            type="text"
            component={renderField}
            label="Enter a description for your project and describe any open positions."
          />
        </span>

        {props.error && <strong>{props.error}</strong>}
        <button className={styles.ViewProject} type="submit">
          Add Project
        </button>
      </div>
    </form>
  );
};

ProjectAddForm = reduxForm({
  // a unique name for the form
  form: "ProjectAddForm"
})(ProjectAddForm);

export default ProjectAddForm;
