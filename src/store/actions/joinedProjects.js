import * as actionTypes from "./actionTypes";
import axios from "../../axios-projects";

import * as loggedInUserAction from "./loggedInUser";

export const setUserJoinedProjects = (projects) => {
  return {
    type: actionTypes.SET_USER_JOINED_PROJECTS,
    projects: projects,
  };
};

export const saveProject = (project, username, joinedProjectTitles) => {
  return async (dispatch) => {
    let joinedProjects = await Promise.all(
      joinedProjectTitles.map((joinedProjectTitle) => {
        return axios.get("Projects/" + joinedProjectTitle + ".json");
      })
    );
    joinedProjects = joinedProjects
      .map((joinedProject) => {
        return joinedProject.data;
      })
      .filter((data) => {
        return data !== null;
      });
    const newArray =
      joinedProjects === undefined ? [project] : [...joinedProjects, project];
    axios.get("Users/" + username + "/projectsJoined.json").then((res) => {
      if (res.data === null) {
        axios.put("Users/" + username + "/projectsJoined.json", [
          project.title,
        ]);
      } else {
        axios
          .put("Users/" + username + "/projectsJoined.json", [
            ...res.data,
            project.title,
          ])
          .then((res) => {
            axios
              .get("Users/" + username + "/projectsJoined.json")
              .then((res) => {
              });
          });
      }
      dispatch(setUserJoinedProjects(newArray));
      // updating the logged in user
      dispatch(loggedInUserAction.fetchLoggedInUser(username));
    });
  };
};
export const userLogout = () => {
  return (dispatch) => {
    dispatch(setUserJoinedProjects([]));
  };
};

export const leaveJoinedProjects = (
  username,
  joinedProjects,
  removeProject
) => {
  return (dispatch) => {
    const removedJoinedProjectArray = joinedProjects.filter((project) => {
      return project !== removeProject;
    });
    axios
      .put(
        "Users/" + username + "/projectsJoined.json",
        removedJoinedProjectArray
      )
      .then((res) => {
        axios
          .get("Users/" + username + "/projectsJoined.json")
          .then(async (res) => {
            let joinedProjectTitles = res.data;
            let joinedProjects = await Promise.all(
              joinedProjectTitles.map((joinedProjectTitle) => {
                return axios.get("Projects/" + joinedProjectTitle + ".json");
              })
            );
            joinedProjects = joinedProjects.map((joinedProject) => {
              return joinedProject.data;
            });
            dispatch(setUserJoinedProjects([...joinedProjects]));
          });
      });
  };
};

export const initJoinedProjects = (projectsJoinedTitles) => {
  //get user
  return (dispatch) => {
    if (projectsJoinedTitles) {
      let projectsJoined = Object.values(projectsJoinedTitles).map((projectTitle) => {
        return axios.get("Projects/" + projectTitle + ".json");
      });
      //wait until i get all of the project data of the projects this user joined

      Promise.all(projectsJoined).then((res) => {
        //we only want the data, so map only the data to a new array
        const projectsJoined = res
          .map((project) => project.data)
          .filter((data) => {
            return data !== null;
          });
        //set the user managed projects in the reducer!
        dispatch(setUserJoinedProjects(projectsJoined));
      });
    }
  };
};
