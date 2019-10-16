import React from 'react';

class FieldFileInput extends React.Component {
    constructor(props) {
        super(props);
        // so i think bind makes it so that we can save functions to other variables, so we can use them using that variable?
        // so whatever method we pass in for onChange for this field (ie <Field onChange={randomMethod}) we can use here?
        // or at least the event
        this.onChange = this.onChange.bind(this);
    }
    // we are basically remaking the onChange method in <input type='file' onChange={} />
    // e stands for event 
    onChange(e) {
        // this is that destructuring crap introduced in ES6
        // const { test } = this.props is the same as: 
        // const test = this.props.test
        const { input: { onChange }} = this.props;
        // runs the onChange method that we got right above (from props)
        onChange(e.target.files[0]);
        console.log('jlee target files0', e)
        console.log('jlee target files1', e.target)
        console.log('jlee target files2', e.target.files)
        console.log('jlee target files3', e.target.files[0])
    }

    render(){
        const {input: { value }} = this.props;
        //these are all of our props. add more if we included more :))))))
        const {input, label, required, meta, } = this.props;
        return(
            <div>
                <label>{label}</label>
                <input
                    type='file'
                    accept='.docx, .jpg, .png, .pdf, .jpeg'
                    onChange={this.onChange}
                    // value={value}
                    meta={meta}
                />
            </div>
        )
    }

}

export default FieldFileInput;