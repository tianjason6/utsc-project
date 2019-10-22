import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ProjectAdd.module.css';
import * as projectActions from '../../store/actions/addProject';
import firebase from "firebase";
import defaultImg from "../../assests/images/box.png";
import history from '../../history';

class ProjectAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      characters: '',
      img1: defaultImg, img2: defaultImg, img3: defaultImg, img4: defaultImg,
      imgs: [],
      imgPath1: "", imgPath2: "", imgPath3: "", imgPath4: "",
      imgPaths: [],
      authUserEmail: '',
      imgUrl: "https://firebasestorage.googleapis.com/v0/b/utsc-projects.appspot.com/o/",
      maxFileSize: 10000000 // 10 Megabyte File Limit, it is measured in bytes
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.imagePreview = this.imagePreview.bind(this);
    this.config = this.config.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  };

  onChange(e) {
    console.log(e.target.value);

    this.setState({ [e.target.name]: e.target.value, characters: e.target.value.length }, () => {
      this.props.projectAdd(this.state.title, this.state.description);

    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.fileUploadHandler();
    var hasImage = false;
    for (var i = 1; i <= 4; i++) {
      if (this.state["img" + i] != defaultImg) {
        this.state.imgs = this.state.imgs.concat(this.state.imgUrl + this.state.title + "%2Fimg" + i + ".jpg?alt=media");
        hasImage = true;
      }
    }
    console.log(this.state.imgs);
    if (hasImage) {
      this.props.onInitProjectAdd(this.state.title, this.state.description, this.state.imgs, this.props.authUserEmail);
      history.push('/test/myProjects');
    } else {
      alert("Please upload a project image");
    }
  }

  imagePreview(event) {
    if (event.target.files[0].size > this.state.maxFileSize) {
      alert("File is too big!");
    } else {
      this.setState({
        ["img" + event.target.id]: URL.createObjectURL(event.target.files[0]),
        ["imgPath" + event.target.id]: event.target.files[0]
      });
    }
  }

  config(event) {

    var firebaseConfig = {
      apiKey: "AIzaSyDICnZMnrvISneUWxo-WfyjCbRj5CMuC2Y",
      authDomain: "utsc-projects.firebaseapp.com",
      databaseURL: "https://utsc-projects.firebaseio.com",
      projectId: "utsc-projects",
      storageBucket: "utsc-projects.appspot.com",
      messagingSenderId: "109791671007",
      appId: "1:109791671007:web:23cdd1c32c44ea59bd6f6a"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    console.log("FIREBASE CONFIG");
  }

  fileUploadHandler = () => {
    this.state.imgPaths = this.state.imgPaths.concat(this.state.imgPath1);
    this.state.imgPaths = this.state.imgPaths.concat(this.state.imgPath2);
    this.state.imgPaths = this.state.imgPaths.concat(this.state.imgPath3);
    this.state.imgPaths = this.state.imgPaths.concat(this.state.imgPath4);
    // Create a root reference
    var storageRef = firebase.storage().ref();

    var ref, file;
    for (var i = 1; i <= 4; i++) {
      if (this.state.imgPaths[i - 1] != "") {
        console.log(this.state.imgPaths[i - 1]);
        // Create a reference to 'mountains.jpg'
        file = this.state.imgPaths[i - 1];
        ref = storageRef.child(this.state.title + '/img' + i + '.jpg');

        ref.put(file).then(function (snapshot) {
          console.log('Uploaded a blob or file!');
        });
      }
    }

  }

  render() {
    console.log('mapStateToProps', this.props.title, this.props.description);
    if (this.props.authUserEmail == null) {
      alert("Please login to create a project");
      history.push('/test/myProjects');

    }
    return (
      <div className={styles.Content} >
        <div className={styles.TitleImgs}>
          {this.config()}

          <input type="text" name="title" placeholder="Project Name" onChange={this.onChange}
            value={this.state.title} maxLength="25"></input>
          <span>
            <div className={styles.imgSelect}>
              <div className={styles.containerSmall}>
                <img className={styles.imgItem} src={this.state.img1}></img>
                <input type="file" className={styles.imgItem} accept="image/*" id="1" onChange={this.imagePreview}></input>
                <h3>Upload Image</h3>
              </div>
              <div className={styles.containerSmall}>
                <img className={styles.imgItem} src={this.state.img2}></img>
                <input type="file" className={styles.imgItem} accept="image/*" id="2" onChange={this.imagePreview2}></input>
                <h3>Upload Image</h3>

              </div>
              <div className={styles.containerSmall}>
                <img className={styles.imgItem} src={this.state.img3}></img>
                <input type="file" className={styles.imgItem} accept="image/*" id="3" onChange={this.imagePreview3}></input>
                <h3>Upload Image</h3>

              </div>
              <div className={styles.containerSmall}>
                <img className={styles.imgItem} src={this.state.img4}></img>
                <input type="file" className={styles.imgItem} accept="image/*" id="4" onChange={this.imagePreview4}></input>
                <h3>Upload Image</h3>

              </div>
              <div className={styles.containerSmall}></div>
            </div>
          </span>
        </div>
        <h1>Description</h1>

        <span>
          <textarea id="message" className={styles.Description} maxLength="800"
            type="text" name="description" placeholder="Enter a description for your project and describe any open positions." onChange={this.onChange} value={this.state.description}></textarea>
          <p>Characters Remaining: {800 - this.state.characters}</p>
        </span>
        <button className={styles.ViewProject} onClick={this.onSubmit}>Add Project</button>
      </div >
    )
  }
}

window.onbeforeunload = function () {
  return true;
};

const mapStateToProps = state => {
  return {
    authUserEmail: state.authReducer.email,
    title: state.projectAddReducer.title,
    description: state.projectAddReducer.description,
    imgs: state.projectAddReducer.imgs,
  };

};

const mapDispatchToProps = dispatch => {
  return {
    projectAdd: (title, description, imgs, authUserEmail) => dispatch(projectActions.projectAdd(title, description, imgs, authUserEmail)),
    onInitProjectAdd: (title, description, imgs, authUserEmail) => dispatch(projectActions.initProjectAdd(title, description, imgs, authUserEmail))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);