import * as actionTypes from "./actionTypes";
import axios from "../../axios-projects";
import { addArchiveStatus } from "./archiveStatus";

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

let setProjects = (projectType, projects, allProjectList, dispatch) => {
  let pTitles = Object.keys(projects);
  let currProjects = pTitles.map(projectTitle => {
    return axios.get(projectType + projectTitle + ".json");
  })
  Promise.all(currProjects).then(res => {
    res.forEach(project => {
      if (project.data) {
        allProjectList.push(project);
        if (projectType === "Projects/") {
          dispatch(addArchiveStatus(false, project.data.title));
        } else {
          dispatch(addArchiveStatus(true, project.data.title));
        }
      }
    })
    dispatch(setAllProjects(allProjectList));
  })
}

export const initAllProjects = () => {
  return (dispatch) => {
    let allProjects = []; // allProjects prop
    axios.get("Projects.json").then(res => {
      setProjects("Projects/", res.data, allProjects, dispatch);
    }).then(
      axios.get("ArchivedProjects.json").then(res => {
        setProjects("ArchivedProjects/", res.data, allProjects, dispatch);
      })
    );
  };
};