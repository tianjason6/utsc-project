import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./AllProjects.module.css";
import axios from "../../axios-projects";

import Project from '../Project/Project';
import * as allProjectsActions from '../../store/actions/allProjects';
import Modal from '../Modal/Modal';
import FeaturedModal from './FeaturedModal/FeaturedModal';

class AllProjects extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onInitAllProjects();
  }

  render() {
    return (
      <div className={styles.Background}>
        <div className={styles.Content}>
          <div className={styles.AllProjects}>
            <h1 className={styles.Title}>All Projects</h1>
            <Modal show={this.props.showModal} closeModal={!this.props.showModal} style={styles.modalStyle}>
              <FeaturedModal />
            </Modal>
            <section className={styles.Wrap}>
              {this.props.allProjects.map((project) => {
                return <Project key={project.data.title} title={project.data.title} description={project.data.description} img={project.data.imgs[0]} projectInfo={project.data} />
              })}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProjects: state.allProjectsReducer.projects,
    error: state.allProjectsReducer.error,
    isArchived: state.archiveStatusReducer.status,
    showModal: state.modalReducer.showModal,
    modalProps: state.modalReducer.modalProps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitAllProjects: () => dispatch(allProjectsActions.initAllProjects())
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(AllProjects);
