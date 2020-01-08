import React from "react";
import { maxFileSize, imgUrl } from "../../firebaseConst.js";
import styles from "./ProjectAddForm.module.css";

class ProjectAddImageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const file = event.target.files[0];
    const id = event.target.id;
    if (file != null) {
      if (file.size > maxFileSize) {
        alert("File is too big!");
      } else {
        this.setState({ img: URL.createObjectURL(file) });
        // this uses the parent class onchange method
        this.props.input.onChange({ file: file, id: id });
      }
    }
  }

  render() {
    const {
      input: { value }
    } = this.props;
    const { input, id } = this.props;
    return (
      <div className={styles.containerSmall}>
        <img className={styles.imgItem} src={this.state.img} alt=""></img>
        <input
          type="file"
          className={styles.imgItem}
          onChange={this.onChange}
          accept="image/*"
          id={id}
        ></input>
        <h3>Upload Image</h3>
      </div>
    );
  }
}

export default ProjectAddImageField;
