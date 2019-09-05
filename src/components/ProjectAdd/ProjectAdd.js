import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ProjectAdd.module.css';
import * as projectActions from '../../store/actions/addProject';

class ProjectAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      characters: '',
      img1: null,
      img2: null,
      img3: null,
      img4: null,
      imgs: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.imagePreview1 = this.imagePreview1.bind(this);
    this.imagePreview2 = this.imagePreview2.bind(this);
    this.imagePreview3 = this.imagePreview3.bind(this);
    this.imagePreview4 = this.imagePreview4.bind(this);

  };

  onChange(e) {
    console.log(e.target.value);

    this.setState({ [e.target.name]: e.target.value, characters: e.target.value.length }, () => {
      this.props.projectAdd(this.state.title, this.state.description);

    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.state.imgs = this.state.imgs.concat(this.state.img1);
    this.state.imgs = this.state.imgs.concat(this.state.img2);
    this.state.imgs = this.state.imgs.concat(this.state.img3);
    this.state.imgs = this.state.imgs.concat(this.state.img4);
    console.log(this.state.imgs);
    this.props.onInitProjectAdd(this.state.title, this.state.description, this.state.imgs);
  }

  imagePreview1(event) {
    console.log("received");
    this.setState({
      img1: URL.createObjectURL(event.target.files[0])
    })
  }
  imagePreview2(event) {
    console.log("received");
    this.setState({
      img2: URL.createObjectURL(event.target.files[0])
    })
  }
  imagePreview3(event) {
    console.log("received");
    this.setState({
      img3: URL.createObjectURL(event.target.files[0])
    })
  }
  imagePreview4(event) {
    console.log("received");
    this.setState({
      img4: URL.createObjectURL(event.target.files[0])
    })
  }

  render() {
    console.log('mapStateToProps', this.props.title, this.props.description);
    return (
      <div className={styles.Content}>
        <div className={styles.TitleImgs}>

          <input type="text" name="title" placeholder="Project Name" onChange={this.onChange}
            value={this.state.title} maxLength="25"></input>
          <span>
            <div className={styles.imgSelect}>
              <div className={styles.containerSmall}>
                <img className={styles.imgItem} src={this.state.img1}></img>
                <input type="file" className={styles.imgItem} accept="image/*" onChange={this.imagePreview1}></input>
              </div>
              <div className={styles.containerSmall}>
                <img className={styles.imgItem} src={this.state.img2}></img>
                <input type="file" className={styles.imgItem} accept="image/*" onChange={this.imagePreview2}></input>
              </div>
              <div className={styles.containerSmall}>
                <img className={styles.imgItem} src={this.state.img3}></img>
                <input type="file" className={styles.imgItem} accept="image/*" onChange={this.imagePreview3}></input>
              </div>
              <div className={styles.containerSmall}>
                <img className={styles.imgItem} src={this.state.img4}></img>
                <input type="file" className={styles.imgItem} accept="image/*" onChange={this.imagePreview4}></input>
              </div>
            </div>
          </span>
        </div>
        <h1>Description</h1>

        <span>
          <textarea id="message" className={styles.Description} maxLength="800"
            type="text" name="description" placeholder="Enter a description for your project and describe any open positions." onChange={this.onChange} value={this.state.description}></textarea>
          <p>Characters Remaining: {800 - this.state.characters}
          </p>
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
    title: state.projectAddReducer.title,
    description: state.projectAddReducer.description,
    imgs: state.projectAddReducer.imgs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    projectAdd: (title, description, imgs) => dispatch(projectActions.projectAdd(title, description, imgs)),
    onInitProjectAdd: (title, description, imgs) => dispatch(projectActions.initProjectAdd(title, description, imgs))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);