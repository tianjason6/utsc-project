import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ProjectFullDetail.module.css";
import * as projectActions from "../../store/actions/project";
import Modal from "../Modal/Modal";

import ProjectOwnerDetail from "./ProjectOwnerDetail/ProjectOwnerDetail";

class ProjectFullDetail extends Component {
  constructor(props) {
    super(props);
    this.params = new URLSearchParams(this.props.location.search);

    this.state = {
      mainImgURL: "",
      projectTitle: this.params.get("projectTitle").replace("%20", " "),
      showModal: false,
      projectOwner: ""
    };
  }

  componentDidMount() {
    this.props.onInitProject(this.state.projectTitle);
  }

  componentDidUpdate() {
    if (this.state.mainImgURL === "" && this.props.project.imgs !== undefined) {
      this.setState({ mainImgURL: this.props.project.imgs[0] });
    }
  }

  selectPicture = imgURL => {
    this.setState({ mainImgURL: imgURL });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    let userInfo = "Loading...";
    if (this.props.user != undefined) {
      userInfo = (
        <div>
          <h2> {this.state.projectTitle} </h2>
          <div>
            <b>Project Owner:</b> {this.props.project.owner}
          </div>
          <div>
            <b>Email:</b> {this.props.user.email}
          </div>
          <br />
          <div>
            <b>Description:</b>
          </div>
          <div>{this.props.project.description}</div>
        </div>
      );
    }
    return (
      <div className={styles.ProjectFullDetail}>
        <div className={styles.TitleImgs}>
          <h1>{this.props.project.title}</h1>
          {this.props.error ? <p>Error loading project</p> : null}
          <img
            className={styles.imgEnlarge}
            src={this.state.mainImgURL}
            alt="Main Img"
          ></img>
          <div className={styles.imgSelect}>
            {this.props.project.imgs
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
        <h1>Description</h1>
        <p className={styles.Description}>{this.props.project.description}</p>
        {console.log(this.state.projectOwner, "owner in project full detail")}
        <ProjectOwnerDetail owner={this.props.project.owner} />
        <Modal show={this.state.showModal} closeModal={this.closeModal}>
          <div>{userInfo}</div>
          <button onClick={this.closeModal}>Exit</button>
        </Modal>
        <button onClick={this.showModal}>Join Project</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.projectReducer.project,
    user: state.userReducer.user,
    error: state.projectsReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitProject: projectTitle =>
      dispatch(projectActions.initProject(projectTitle))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFullDetail);
