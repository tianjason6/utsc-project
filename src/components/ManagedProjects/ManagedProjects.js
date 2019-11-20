import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ManagedProjects.module.css';
import ManagedProjectsOverview from '../ManagedProjectsOverview/ManagedProjectsOverview';

class ManagedProjects extends Component {
  render() {
    return (
      <div className={styles.Content}>
        <ManagedProjectsOverview></ManagedProjectsOverview>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

export default connect(mapStateToProps, null, null, { pure: false })(ManagedProjects);