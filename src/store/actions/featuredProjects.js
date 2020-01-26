import * as actionTypes from './actionTypes';
import axios from '../../axios-projects';

export const setFeaturedProjects = (projects) => {
  return {
    type: actionTypes.SET_FEATURED_PROJECTS,
    projects: projects
  }
}

export const fetchFeaturedProjectsFailed = () => {
  return {
    type: actionTypes.FETCH_FEATURED_PROJECTS_FAILED
  }
}

export const initFeaturedProjects = () => {
  return (dispatch) => {
    axios.get('FeaturedProjects.json')
      .then((res) => {
        let featuredProjectTitles = res.data;
        let projectRequests = featuredProjectTitles.map((projectTitle) => {
          return axios.get('Projects/' + projectTitle + '.json')
        });
        Promise.all(projectRequests)
          .then((res) => {
            let featuredProjects = [];
            res.forEach((item) => {
              featuredProjects.push(item.data);
            })
            dispatch(setFeaturedProjects(featuredProjects));
          })
      })
  }
}

export const removeFeaturedProject = (newFeaturedList) => {
  return dispatch => {
    axios.put("FeaturedProjects.json", newFeaturedList)
      .then(
        dispatch(setFeaturedProjects(newFeaturedList))
      )
      .catch(console.log("undefined new featured list"));
  }
}