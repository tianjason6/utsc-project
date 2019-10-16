import React, { Component } from 'react';

import styles from './AddTimelineForm.module.css';
import { Field, reduxForm } from 'redux-form';

//jlee test
import RenderFileField from '../../FieldFileInput/FieldFileInput';

const validate = (values) => {
    const errors = {}
    if(!values.content) {
        errors.content = 'required';
    }

    //if it has an attachment, it needs a name
    if(values.attachment && !values.attachmentName) {
        errors.attachmentName = 'required';
    }

    return errors;
}

const renderField = ({ input, meta, label, type, name, accept }) => (
    <div className={styles.background}>
        <div className={
            [   styles.formItem, 
                (meta.error && meta.touched ? styles.error : ''),
                (meta.active ? styles.active : '')
            ].join(' ')
            }>
            <label>{label}</label>
            {type!='file' 
                ? < input {...input} name={name} type={type} />
                : <input name={name} type={type}  accept={accept} />
            }
            
            
            { meta.error && meta.touched && <span>{meta.error}</span>}
        </div>
    </div>
    
)

const showResults = (values, event) => {
    window.alert(JSON.stringify(values))
    console.log('jlee event: ', event);
};

const onChangeTest = (event) =>{
    console.log('jlee on change test0: ', event);
    console.log('jlee on change test1: ', event.name);
    console.log('jlee on change test2: ', event.webkitRelativePath);
    console.log('jlee on change test3: ', event.valueOf());
    
    // window.alert()
}

let addTimelineForm = ( { handleSubmit, submitting } , sub) => {
    // const { handleSubmit } = props;

    return (
    <form onSubmit={ handleSubmit(showResults) }>
        <Field
            name='content'
            component={renderField}
            type='text'
            label='Content'
        />
        
        <Field 
            name='attachmentName'
            component={renderField}
            type='text'
            label='Attachment Name'
        />
        <Field 
            name='attachment' 
            component={RenderFileField}
            type='file'
            label='Attachments'
            onChange={onChangeTest}
        />
        {/* </div> */}
        {/* jlee test if the button gets disabled while submitting the form or something */}
        <button type='submit' disabled={submitting} >submit</button>
    </form>
    )
}

addTimelineForm = reduxForm({
    form: 'addTimeline',
    destroyOnUnmount: false,
    validate
})(addTimelineForm);

export default addTimelineForm;