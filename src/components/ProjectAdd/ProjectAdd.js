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
      mainImage: '',
      images: []
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onChange(e) {
    console.log(e.target.value);

    this.setState({ [e.target.name]: e.target.value, characters: e.target.value.length }, () => {
      this.props.projectAdd(this.state.title, this.state.description);

    });
  }

  onSubmit(e) {
    e.preventDefault();

    const project = {
      title: this.state.title,
      description: this.state.description
    }
    this.props.onInitProjectAdd(this.state.title, this.state.description);


  }

  render() {
    console.log('mapStateToProps', this.props.title, this.props.description);
    return (
      <div className={styles.Content}>
        <div className={styles.TitleImgs}>
          <input type="text" name="title" placeholder="Project Name" onChange={this.onChange}
            value={this.state.title} maxLength="25"></input>
          <img className={styles.imgEnlarge} src={this.state.mainImage}></img>
          <span>
            <h2>Upload Main Project Image</h2>
            <input type="file" name="image" accept="image/*"></input>
          </span>
          <div className={styles.imgSelect}>
            <img className={styles.imgItem} src={this.state.sideImage1}></img>
            <img className={styles.imgItem} src={this.state.sideImage2}></img>
            <img className={styles.imgItem} src={this.state.sideImage3}></img>
            <img className={styles.imgItem} src={this.state.sideImage3}></img>
          </div>
          <span>
            <div className={styles.imgUpload}>
              <input type="file" className={styles.uploadItem} accept="image/*"></input>
              <input type="file" className={styles.uploadItem} accept="image/*"></input>
              <input type="file" className={styles.uploadItem} accept="image/*"></input>
              <input type="file" className={styles.uploadItem} accept="image/*"></input>
            </div>
            <h2>Upload up to 4 project images</h2>
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
      </div>
    )
  }
}

window.onbeforeunload = function () {
  return true;
};

const mapStateToProps = state => {
  return {
    title: state.projectAddReducer.title,
    description: state.projectAddReducer.description
  };
};

const mapDispatchToProps = dispatch => {
  return {
    projectAdd: (title, description) => dispatch(projectActions.projectAdd(title, description)),
    onInitProjectAdd: (title, description) => dispatch(projectActions.initProjectAdd(title, description))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAdd);