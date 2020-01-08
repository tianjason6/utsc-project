import React from 'react';
import { Field, reduxForm, SubmissionError, reset } from 'redux-form';
import { submit, successConfirmation } from '../../store/actions/submit';
import { connect } from 'react-redux';
import styles from './ContactUsForm.module.css';

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


let ContactUsForm = (props) => {
  if(props.formStatus.success){
    alert(props.formStatus.message)
    props.successConfirmation();
  }
  const { handleSubmit } = props;

  const submit = (values) => {
    if(props.formStatus.timeout){
      alert("Please allow up to 10 seconds before your second submission :)");
      return;
    }
    let error = {};
    let isError = false;

    if(!('firstName' in values)) {
      error.firstName = 'Required';
      isError = true;
    }

    if(!('lastName' in values)) {
      error.lastName = 'Required';
      isError = true;
    }

    if(!('program' in values)) {
      error.program = 'Required';
      isError = true;
    }
    
    if(!('yearOfStudy' in values)) {
      error.yearOfStudy = 'Required';
      isError = true;
    }

    if(!('email' in values)) {
      error.email = 'Required';
      isError = true;
    }

    if(!('message' in values)) {
      error.message = 'Required';
      isError = true;
    }
    if(isError) {
      throw new SubmissionError(error);
    } else {
      props.submitEmail(values);
      if(!props.formStatus.error){
        props.resetform();
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.Form}>
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
      />
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
      />
      <Field
        name="program"
        type="text"
        component={renderField}
        label="Program"
      />
      <Field
        name="yearOfStudy"
        type="text"
        component={renderField}
        label="Year Of Study"
      />
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
      />
      <Field
        name="message"
        type="textarea"
        component={renderField}
        label="Message"
      />
      {props.error && <p className={styles.Strong}>{props.error}</p>}
      <button className={styles.SubmitButton} type="submit">
        Submit
      </button>
    </form>
  )
}

ContactUsForm = reduxForm({
  form: 'ContactUsForm'
})(ContactUsForm)

const mapDispatchToProps = (dispatch) => {
  return {
    submitEmail: (res) => {dispatch(submit(res))},
    resetform: () => {dispatch(reset('ContactUsForm'))},
    successConfirmation: () => {dispatch(successConfirmation())}
  };
}

const mapStateToProps = state => {
  return {
    formStatus: state.submitReducer
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsForm);