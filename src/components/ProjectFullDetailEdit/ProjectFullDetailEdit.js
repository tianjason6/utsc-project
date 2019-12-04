import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ProjectFullDetailEdit.module.css";
import * as projectActions from "../../store/actions/project";

class ProjectFullDetailEdit extends Component {
  constructor(props) {
    super(props);
    this.params = new URLSearchParams(this.props.location.search);

    this.state = {
      mainImgURL: "",
      projectTitle: this.params.get("projectTitle").replace("%20", " ")
    };
  }

  componentDidMount() {
    this.props.onInitProject(this.state.projectTitle);
  }

  componentDidUpdate() {
    if (this.state.mainImgURL === "" && this.props.imgs !== undefined) {
      this.setState({ mainImgURL: this.props.project.imgs[0] });
    }
  }

  selectPicture = imgURL => {
    this.setState({ mainImgURL: imgURL });
  };

  render() {
    return (
      <div className={styles.Content}>
        <div className={styles.TitleImgs}>
          <h1 className={styles.heading}>{this.state.projectTitle}</h1>
          {this.props.error ? <p className={styles.paragraph}>Error loading project</p> : null}
          <img
            className={styles.imgEnlarge}
            src={this.state.mainImgURL}
            alt="Main Img"
          ></img>
          <div className={styles.imgSelect}>
            {this.props.imgs
              ? this.props.project.imgs.map((imgURL, i) => {
                return (
                  <img
                    key={i}
                    className={styles.imgItem}
                    src={imgURL}
                    alt={imgURL}
                    onMouseEnter={() => this.selectPicture(imgURL)}
                  ></img>
                );
              })
              : null}
          </div>
        </div>
        <h1 className={styles.heading}>Description</h1>
        <p className={styles.Description}>{this.props.description}</p>

        <button>Join Project</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.projectReducer.project,
    error: state.projectsReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitProject: projectTitle =>
      dispatch(projectActions.initProject(projectTitle))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectFullDetailEdit);
