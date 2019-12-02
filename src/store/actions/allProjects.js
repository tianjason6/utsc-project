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
  return dispatch => {
    axios
      .get("Projects.json")
      .then(res => {
        let allProject = res.data;
        axios.get("ArchivedProjects.json").then(res => {
          dispatch(setAllProjects(allProject + res.data));
        });
      })
      .catch(error => {
        dispatch(fetchAllProjectsFailed());
      });
  };
};
