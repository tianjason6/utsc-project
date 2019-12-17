import * as actionTypes from "./actionTypes";
import axios from "../../axios-projects";

export const setAllProjects = projects => {
  return {
    type: actionTypes.SET_ALL_PROJECTS,
    projects: projects
  };
};

export const fetchAllProjectsFailed = () => {
  return {
    type: actionTypes.FETCH_ALL_PROJECTS_FAILED
  };
};

export const initAllProjects = () => {
  return (dispatch) => {
    axios.get('AllProjects.json')
      .then((res) => {
        let ProjectTitles = res.data;
        let projectRequests = ProjectTitles.map((projectTitle) => {
          return axios.get('Projects/' + projectTitle + '.json')
        });
        Promise.all(projectRequests)
          .then((res) => {
            let allProjects = [];
            res.forEach((item) => {
              allProjects.push(item.data);
            })
            dispatch(setAllProjects(allProjects));
          })
      })
  }
};
