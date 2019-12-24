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

// helper function
let setProjects = (projectType, projects, allProjectList, dispatch) => {
  let pTitles = Object.keys(projects);
  let currProjects = pTitles.map(projectTitle => {
    return axios.get(projectType + projectTitle + ".json");
  })
  Promise.all(currProjects).then(res => {
    res.forEach(project => {
      allProjectList.push(project.data);
    })
    dispatch(setAllProjects(allProjectList));
  })
}

export const initAllProjects = () => {
  return (dispatch) => {
    let allProjects = [];
    axios.get("Projects.json").then(res => {
      setProjects("Projects/", res.data, allProjects, dispatch);
    }).then(
      axios.get("ArchivedProjects.json").then(res => {
        setProjects("ArchivedProjects/", res.data, allProjects, dispatch);
      })
    );
  };
};