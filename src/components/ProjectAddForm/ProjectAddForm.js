import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import styles from './SignUpForm.module.css';
import axios from '../../axios-projects';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={styles.Field}>
    <label>{label}</label>

    {
      label === 'Message' ?
        <textarea className={styles.Message} {...input} placeholder={label} type={type} />
        :
        <input className={styles.Regular} {...input} placeholder={label} type={type} />
    }

    {touched && error && <span>{error}</span>}
  </div>
)

let ProjectAddForm = props => {

  const { handleSubmit } = props;

  const submit = (values) => {
    props.onInitProjectAdd(values.email, values.password);
  }

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.Form}>
      <Field
        name="name"
        type="name"
        component={renderField}
        label="Project Name"
      />
      <Field
        name="description"
        type="name"
        component={renderField}
        label="Project Description"
      />
      {props.error && <strong>{props.error}</strong>}
      <button className={props.loading ? [styles.SubmitButton, styles.SubmitButtonLoading].join(' ') : styles.SubmitButton} type="submit" disabled={props.loading}>
        {props.loading ? 'Loading' : 'Submit'}
      </button>
    </form>
  )
}

ProjectAddForm = reduxForm({
  // a unique name for the form
  form: 'ProjectAddForm'
})(ProjectAddForm)

export default ProjectAddForm;