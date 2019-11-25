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
    this.imagePreview = this.imagePreview.bind(this);
  }

  onChange(e) {
    this.imagePreview(e);
  }

  imagePreview(event) {
    if (event.target.files[0].size > maxFileSize) {
      alert("File is too big!");
    } else {
      this.setState({
        img: URL.createObjectURL(event.target.files[0])
      });
      this.props.input.uploadImage(this.state.img);
    }
  }

  render() {
    const {
      input: { value }
    } = this.props;
    //these are all of our props. add more if we included more :))))))
    const { id } = this.props;
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
