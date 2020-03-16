import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./ProjectFullDetail.module.css";
import * as projectActions from "../../store/actions/project";
import * as userActions from "../../store/actions/user";
import Modal from "../Modal/Modal";
import axios from "../../axios-projects";

import ProjectOwnerDetail from "./ProjectOwnerDetail/ProjectOwnerDetail";
import ArchiveStatus from "../ArchiveStatus/ArchiveStatus";
import FeaturedModal from "../AllProjects/FeaturedModal/FeaturedModal";

import * as archiveStatus from "../../store/actions/archiveStatus";
import * as userJoinedProjectsAction from "../../store/actions/joinedProjects";
import * as modalActions from "../../store/actions/modal";

class ProjectFullDetail extends Component {
  constructor(props) {
    super(props);
    this.params = new URLSearchParams(this.props.location.search);

    this.state = {
      foundProject: false,
      projectExists: false,
      mainImgURL: "",
      projectTitle: this.params.get("projectTitle").replace("%20", " "),
      showModal: false,
      projectOwner: ""
    };
  }

  componentDidMount() {
    //this.checkProject( this.state.project ) 

    this.props.onInitProject(
      this.state.projectTitle,
      this.props.isArchived[this.state.projectTitle]
    );

    if (this.props.loggedInUser) {
      this.props.fetchJoinedProjects(this.props.loggedInUser.projectsJoined);
    }
  }

  componentDidUpdate() {
    if (this.state.mainImgURL === "" && this.props.project.imgs !== undefined) {
      this.setState({ mainImgURL: this.props.project.imgs[0] });
    }
  }

  // checkProject = (project) => { 
  //   this.setState({ foundProject: this.props.userJoinedProjects.find(project)})
    
  // }
  addToJoinProject = () => {
    console.log(this.props.project);
    console.log("User: ", this.props.loggedInUser.username)
    this.props.saveProject(this.props.project, 
      this.props.loggedInUser.username, this.props.loggedInUser.projectsJoined);
    this.closeModal();
  };

  selectPicture = imgURL => {
    this.setState({ mainImgURL: imgURL });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  leaveProject = () => {
    this.props.leaveJoinedProjects(
      this.props.loggedInUser.username,
      this.props.loggedInUser.projectsJoined,
      this.props.project.title
    );
  };


  render() {
    console.log("props", this.props);
    console.log("state", this.state);
    let projectOwnerInfo = "Loading...";
    if (this.props.projectOwner !== undefined) {
      projectOwnerInfo = (
        <div>
          <h2> {this.state.projectTitle} </h2>
          <div>
            <b>Project Owner:</b> {this.props.project.owner}
          </div>
          <div>
            <b>Email:</b> {this.props.projectOwner.email}
          </div>
          <br />
          <div>
            <b>Description:</b>
          </div>
          <div>{this.props.project.description}</div>
        </div>
      );
    }

    let modalButton = (
      <button className={styles.ContentButton} onClick={this.showModal}>
        Loading.....
      </button>
    );
    let modalContent = (
      <div>
        <div>Loading.....</div>
        <button className={styles.ContentButton} onClick={this.closeModal}>
          Exit
        </button>
      </div>
    );

    let foundProject = undefined;

    foundProject = this.props.userJoinedProjects.find(project => {
      return project.title === this.state.projectTitle;
    });

    console.log("a", this.props.joinedProjects, "b", this.state.projectTitle);
    let found = false;
    this.props.userJoinedProjects.forEach(project => {
      if(this.state.projectTitle === project.title){
        found = true;
      }
    });

    if (foundProject !== undefined && found) {
      modalContent = (
        <div>
          <h3>Are you sure you want to leave project?</h3>
          <div>
            There will be no going back, unless the project owner accepts you
            again
          </div>
          <button
            className={[styles.ContentButton, styles.YesButton].join(" ")}
            onClick={this.leaveProject}
          >
            Yes
          </button>
          <button
            className={[styles.ContentButton, styles.NoButton].join(" ")}
            onClick={this.closeModal}
          >
            NO
          </button>
        </div>
      );
      modalButton = (
        <div className={styles.button_container}>
            <button className={styles.ContentButton} onClick={this.showModal}>
              Leave Project
            </button>
        </div>
      );
    } else {
      modalButton = (
        <div className={styles.button_container}>
          <button className={styles.ContentButton} onClick={this.showModal}>
            Join Project
          </button>
        </div>
      );
      modalContent = (
        <div>
          <div>{projectOwnerInfo}</div>
          <button className={styles.ContentButton} onClick={this.addToJoinProject}>
            Join
          </button>
        </div>
      );
    }

    let archiveButton = undefined;
    if (this.props.loggedInUser) {
      if (this.props.loggedInUser.isAdmin === true) {
        archiveButton = (
          <ArchiveStatus projectTitle={this.state.projectTitle} />
        );
      }
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
        
        <Modal show={this.state.showModal} closeModal={this.closeModal}>
            {modalContent}
        </Modal>
        <ProjectOwnerDetail owner={this.props.project.owner} />
        <Modal
          show={this.props.showModal}
          closeModal={() => {
            this.props.hideModal();
          }}
          style={styles.modalStyle}
        >
          <FeaturedModal />
        </Modal>
        {modalButton}
        {archiveButton}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    project: state.projectReducer.project,
    projectOwner: state.userReducer.user,
    error: state.projectsReducer.error,
    userJoinedProjects: state.userJoinedProjectsReducer.projects,
    loggedInUser: state.loggedInUserReducer.loggedInUser,
    isArchived: state.archiveStatusReducer.status,

    showModal: state.modalReducer.showModal,
    modalProps: state.modalReducer.modalProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitProject: (projectTitle, status) =>
      dispatch(projectActions.initProject(projectTitle, status)),

    addToJoinProject: (projectTitle) =>
      dispatch(
        userJoinedProjectsAction.setUserJoinedProjects(
          projectTitle
        )
      ),
      
    saveProject: (project, username, joinedProjects) => 
          dispatch(
            userJoinedProjectsAction.saveProject(
              project,
              username, 
              joinedProjects
            )
          ), 
    fetchJoinedProjects: userName =>
      dispatch(userJoinedProjectsAction.initJoinedProjects(userName)),
    leaveJoinedProjects: (username, joinedProjects, removeProject) =>
      dispatch(
        userJoinedProjectsAction.leaveJoinedProjects(
          username,
          joinedProjects,
          removeProject
        )
      ),
    addArchiveStatus: (status, pTitle) =>
      dispatch(archiveStatus.addArchiveStatus(status, pTitle)),

    hideModal: () => dispatch(modalActions.hideModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFullDetail);
