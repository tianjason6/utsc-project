import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';
import * as archiveStatus from './archiveStatus';

export const setProject = (project) => {
  return {
    type: actionTypes.SET_PROJECT,
    project: project
  }
}

export const fetchProjectFailed = () => {
  return {
    type: actionTypes.FETCH_PROJECT_FAILED
  }
}

export const initProject = (projectTitle, status) => {
  return (dispatch) => {
    let projectLocation = "";
    if (status) {
      projectLocation = "ArchivedProjects/";
      dispatch(archiveStatus.addArchiveStatus(true, projectTitle));
    } else {
      projectLocation = "Projects/";
      dispatch(archiveStatus.addArchiveStatus(false, projectTitle));
    }
    axios.get(projectLocation + projectTitle + '.json')
      .then(res => {
        if (res.data) {
          axios.get('Users/' + res.data.owner + '.json')
            .then(res => {
              dispatch({
                type: actionTypes.FETCH_USER,
                user: res.data
              });
            });
          dispatch(setProject(res.data));
        }
      })
      .catch(error => {
        dispatch(fetchProjectFailed());
      });
  }
}