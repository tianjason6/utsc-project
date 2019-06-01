import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './MyProjects.module.css';
import MyProjectsOverview from '../MyProjectsOverview/MyProjectsOverview';

class MyProjects extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <MyProjectsOverview></MyProjectsOverview>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(MyProjects);