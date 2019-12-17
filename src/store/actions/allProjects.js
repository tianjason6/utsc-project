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
  // this will break if database list is not keys are not continuous 
  return (dispatch) => {
    let allProjects = [];
    axios.get('ActiveProjects.json')
      // maybe use a helper function so this is not redundant???
      .then((res) => {
        let ProjectTitles = res.data;
        let archiveProjectRequests = ProjectTitles.map((projectTitle) => {
          return axios.get('Projects/' + projectTitle + '.json')
        });
        Promise.all(archiveProjectRequests)
          .then((res) => {
            res.forEach((item) => {
              allProjects.push(item.data);
            })
          })

      }).then(axios.get('ArchivedProjects.json')
        .then((res) => {
          let ProjectTitles = res.data;
          let projectRequests = ProjectTitles.map((projectTitle) => {
            return axios.get('Projects/' + projectTitle + '.json')
          });
          Promise.all(projectRequests)
            .then((res) => {
              res.forEach((item) => {
                allProjects.push(item.data);
              })
              dispatch(setAllProjects(allProjects));
            })
        }))
  }
};
