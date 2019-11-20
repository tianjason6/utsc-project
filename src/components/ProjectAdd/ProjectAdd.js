import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ProjectAdd.module.css";
import * as projectActions from "../../store/actions/addProject";
import firebase from "firebase";
import defaultImg from "../../assests/images/box.png";
import history from "../../history";
import axios from "../../axios-projects";
import { firebaseConfig, maxFileSize, imgUrl } from "../../firebaseConst.js";
import ProjectAddForm from "../ProjectAddForm/ProjectAddForm";

class ProjectAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      characters: "",
      img1: defaultImg,
      img2: defaultImg,
      img3: defaultImg,
      img4: defaultImg,
      imgs: [],
      imgPath1: "",
      imgPath2: "",
      imgPath3: "",
      imgPath4: "",
      imgPaths: [],
      authUserEmail: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.imagePreview = this.imagePreview.bind(this);
    this.config = this.config.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    let projectData = null;
    // Fetching the project names
    axios.get("Projects/" + this.state.title + ".json").then(res => {
      projectData = res.data;
      if (projectData != null) {
        // If project does not exist, put request
        alert("A project with this name already exists");
      } else {
        this.fileUploadHandler();
        let hasImage = false;
        for (let i = 1; i <= 4; i++) {
          if (this.state["img" + i] !== defaultImg) {
            this.state.imgs = this.state.imgs.concat(
              imgUrl + this.state.title + "%2Fimg" + i + ".jpg?alt=media"
            );
            hasImage = true;
          }
        }
        if (hasImage) {
          this.props.onInitProjectAdd(
            this.state.title,
            this.state.description,
            this.state.imgs,
            this.props.authUserEmail
          );
          history.push("/test/myProjects");
        } else {
          alert("Please upload a project image");
        }
      }
    });
  }

  imagePreview(event) {
    if (event.target.files[0].size > maxFileSize) {
      alert("File is too big!");
    } else {
      this.setState({
        ["img" + event.target.id]: URL.createObjectURL(event.target.files[0]),
        ["imgPath" + event.target.id]: event.target.files[0]
      });
    }
  }

  config(event) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  fileUploadHandler = () => {
    this.state.imgPaths = this.state.imgPaths.concat(this.state.imgPath1);
    this.state.imgPaths = this.state.imgPaths.concat(this.state.imgPath2);
    this.state.imgPaths = this.state.imgPaths.concat(this.state.imgPath3);
    this.state.imgPaths = this.state.imgPaths.concat(this.state.imgPath4);
    // Create a root reference
    let storageRef = firebase.storage().ref();

    let ref, file;
    for (let i = 1; i <= 4; i++) {
      if (this.state.imgPaths[i - 1] !== "") {
        file = this.state.imgPaths[i - 1];
        ref = storageRef.child(this.state.title + "/img" + i + ".jpg");
        ref.put(file);
      }
    }
  };

  render() {
    if (this.props.authUserEmail == null) {
      alert("Please login to create a project");
      history.push("/test/myProjects");
    }
    return (
      <div>
        {this.config()}
        <ProjectAddForm onInitProjectAdd={this.props.initProjectAdd} />
      </div>
    );
  }
}

window.onbeforeunload = function() {
  return true;
};

const mapStateToProps = state => {
  return {
    authUserEmail: state.authReducer.email,
    title: state.projectAddReducer.title,
    description: state.projectAddReducer.description,
    imgs: state.projectAddReducer.imgs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    projectAdd: (title, description, imgs, authUserEmail) =>
      dispatch(
        projectActions.projectAdd(title, description, imgs, authUserEmail)
      ),
    onInitProjectAdd: (title, description, imgs, authUserEmail) =>
      dispatch(
        projectActions.initProjectAdd(title, description, imgs, authUserEmail)
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);
