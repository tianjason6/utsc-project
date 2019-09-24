import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ProjectAdd.module.css';
import * as projectActions from '../../store/actions/addProject';
import firebase from "firebase";
import defaultImg from "../../assests/images/box.png";

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
      authUserEmail: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.imagePreview1 = this.imagePreview1.bind(this);
    this.imagePreview2 = this.imagePreview2.bind(this);
    this.imagePreview3 = this.imagePreview3.bind(this);
    this.imagePreview4 = this.imagePreview4.bind(this);
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
    if (this.state.img1 != defaultImg)
      this.state.imgs = this.state.imgs.concat(this.state.img1);
    if (this.state.img2 != defaultImg)
      this.state.imgs = this.state.imgs.concat(this.state.img2);
    if (this.state.img3 != defaultImg)
      this.state.imgs = this.state.imgs.concat(this.state.img3);
    if (this.state.img4 != defaultImg)
      this.state.imgs = this.state.imgs.concat(this.state.img4);

    console.log(this.state.imgs);
    console.log("authUserEmail:" + this.props.authUserEmail);

    this.props.onInitProjectAdd(this.state.title, this.state.description, this.state.imgs, this.props.authUserEmail);
  }

  imagePreview1(event) {
    console.log("received");
    this.setState({
      img1: URL.createObjectURL(event.target.files[0]),
      imgPath1: event.target.files[0]
    });

  }
  imagePreview2(event) {
    console.log("received");
    this.setState({
      img2: URL.createObjectURL(event.target.files[0]),
      imgPath2: event.target.files[0]
    });
  }
  imagePreview3(event) {
    console.log("received");
    this.setState({
      img3: URL.createObjectURL(event.target.files[0]),
      imgPath3: event.target.files[0]
    });
  }
  imagePreview4(event) {
    console.log("received");
    this.setState({
      img4: URL.createObjectURL(event.target.files[0]),
      imgPath4: event.target.files[0]
    });
  }

  config(event) {

    var firebaseConfig = {


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
                <input type="file" className={styles.imgItem} accept="image/*" onChange={this.imagePreview1}></input>
                <h3>Upload Image</h3>
              </div>
              <div className={styles.containerSmall}>
                <img className={styles.imgItem} src={this.state.img2}></img>
                <input type="file" className={styles.imgItem} accept="image/*" onChange={this.imagePreview2}></input>
                <h3>Upload Image</h3>

              </div>
              <div className={styles.containerSmall}>
                <img className={styles.imgItem} src={this.state.img3}></img>
                <input type="file" className={styles.imgItem} accept="image/*" onChange={this.imagePreview3}></input>
                <h3>Upload Image</h3>

              </div>
              <div className={styles.containerSmall}>
                <img className={styles.imgItem} src={this.state.img4}></img>
                <input type="file" className={styles.imgItem} accept="image/*" onChange={this.imagePreview4}></input>
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
    imgs: state.projectAddReducer.imgs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    projectAdd: (title, description, imgs) => dispatch(projectActions.projectAdd(title, description, imgs)),
    onInitProjectAdd: (title, description, imgs, authUserEmail) => dispatch(projectActions.initProjectAdd(title, description, imgs, authUserEmail))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);