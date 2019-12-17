import React, { Component } from "react";
import { connect } from "react-redux";
import Project from '../Project/Project';
import * as allProjectsActions from '../../store/actions/allProjects';

class AllProjects extends Component {
  componentDidMount() {
    this.props.onInitAllProjects();
  }

  render() {
    console.log("all projects component: ", this.props);
    return (
      <div>
        <div>
          <h1>All Projects</h1>
          <section>
            {this.props.allProjects.map((project) => {
              return <Project key={project.title} title={project.title} description={project.description} img={project.imgs[0]} projectInfo={project} />
            })}
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allProjects: state.allProjectsReducer.projects,
    error: state.allProjectsReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitAllProjects: () => dispatch(allProjectsActions.initAllProjects())
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(AllProjects);
