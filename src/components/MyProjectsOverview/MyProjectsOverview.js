import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './MyProjectsOverview.module.css';
import Project from '../Project/Project';
import Project1Img from '../../assests/images/tempLogo.png';
import AddProject1Img from '../../assests/images/addProject.svg';
import * as featuredProjectsActions from '../../store/actions/featuredProjects';

class MyProjectsOverview extends Component {

  componentDidMount() {
    // this.props.onInitFeaturedProjects();
  }

  render() {

    return (
      <div className={styles.Background} >
        <div className={styles.OngoingProjects}>
          <h1>My Projects</h1>
          <section className={styles.Wrap}>
            {/* {this.props.featuredProjects.map((featuredProject) => {
              return <Project key={featuredProject.title} title={featuredProject.title} description={featuredProject.description} img={featuredProject.imgs[0]} projectInfo={featuredProject} />
            }) } */}

            <Project addProject img={AddProject1Img} />
            <Project editProject title={'A'} description={'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various version'} img={Project1Img} projectInfo={'helo'} />
            <Project editProject title={'Project1'} description={'hello'} img={Project1Img} projectInfo={'helo'} />
            <Project editProject title={'Project1'} description={'hello'} img={Project1Img} projectInfo={'helo'} />
            <Project editProject title={'Project1'} description={'hello'} img={Project1Img} projectInfo={'helo'} />
            <Project editProject title={'Project1'} description={'hello'} img={Project1Img} projectInfo={'helo'} />
            <Project editProject title={'Project1'} description={'hello'} img={Project1Img} projectInfo={'helo'} />
            <Project editProject title={'Project1'} description={'hello'} img={Project1Img} projectInfo={'helo'} />
            <Project editProject title={'Project1'} description={'hello'} img={Project1Img} projectInfo={'helo'} />
          </section>
        </div>
      </div>


    )
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(MyProjectsOverview);