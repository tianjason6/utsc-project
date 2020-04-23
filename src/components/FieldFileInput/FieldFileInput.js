import React from 'react';
import styles from './FieldFileInput.module.css';

class FieldFileInput extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    // we are basically remaking the onChange method in <input type='file' onChange={} />
    // e stands for event 
    onChange(e) {
        //blob stands for Binary Large OBject
        const fileBlob = e.target.files[0];
        const reader = new FileReader();
        // if it triggers the load event, run the callback function
        reader.addEventListener('load', () => {
            //this will load an image onto the screen so temporarily we will comment it out and see if we can put in firebase
            document.getElementById('img1').setAttribute('src', reader.result);
        });
        // //step 2
        // // this triggers a load event so it runs the acllback function
        reader.readAsDataURL(fileBlob);
        
        // this uses the parent class onchange method
        this.props.input.onChange(fileBlob);
    }

    render(){
        //these are all of our props. add more if we included more :))))))
        const {label, meta} = this.props;
        return(
            <div className={styles.inputItem}>
                
                <input
                    id='file'
                    className={styles.inputfile}
                    type='file'
                    accept='.docx, .jpg, .png, .pdf, .jpeg'
                    onChange={this.onChange}
                    meta={meta}
                />
                <label for='file' className={this.props.className} >{label}</label>
                <img id='img1' className={styles.image} alt={"FileImage"}/>
            </div>
        )
    }
}

export default FieldFileInput;