import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./MyProjectsOverview.module.css";
import Project from "../Project/Project";
import Project1Img from "../../assests/images/tempLogo.png";
import AddProject1Img from "../../assests/images/addProject.svg";
import * as featuredProjectsActions from "../../store/actions/featuredProjects";

class MyProjectsOverview extends Component {
  componentDidMount() {
    // this.props.onInitFeaturedProjects();
  }

  render() {
    return (
      <div className={styles.Background}>
        <div className={styles.OngoingProjects}>
          <h1>My Projects</h1>
          <section className={styles.Wrap}>
            {/* {this.props.featuredProjects.map((featuredProject) => {
              return <Project key={featuredProject.title} title={featuredProject.title} description={featuredProject.description} img={featuredProject.imgs[0]} projectInfo={featuredProject} />
            }) } */}

            <Project addProject img={AddProject1Img} />
            <Project
              editProject
              title={"Project1"}
              description={"hello"}
              img={Project1Img}
              projectInfo={"helo"}
            />
            <Project
              editProject
              title={"Project1"}
              description={"hello"}
              img={Project1Img}
              projectInfo={"helo"}
            />
            <Project
              editProject
              title={"Project1"}
              description={"hello"}
              img={Project1Img}
              projectInfo={"helo"}
            />
            <Project
              editProject
              title={"Project1"}
              description={"hello"}
              img={Project1Img}
              projectInfo={"helo"}
            />
            <Project
              editProject
              title={"Project1"}
              description={"hello"}
              img={Project1Img}
              projectInfo={"helo"}
            />
            <Project
              editProject
              title={"Project1"}
              description={"hello"}
              img={Project1Img}
              projectInfo={"helo"}
            />
            <Project
              editProject
              title={"Project1"}
              description={"hello"}
              img={Project1Img}
              projectInfo={"helo"}
            />
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    featuredProjects: state.featuredProjectsReducer.projects,
    error: state.featuredProjectsReducer.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // onInitFeaturedProjects: () => dispatch(featuredProjectsActions.initFeaturedProjects())
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(MyProjectsOverview);
