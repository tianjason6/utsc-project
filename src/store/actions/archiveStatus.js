import * as actionTypes from "./actionTypes";
import axios from "../../axios-projects";

// can optimize this later
export const changeArchiveStatus = (status, pTitle) => {
  if (status) {
    // archive
    axios
      .get("Projects/" + pTitle + ".json")
      .then(projectData => {
        const archiving = projectData.data;
        axios
          .put("ArchivedProjects/" + pTitle + ".json", archiving)
          .catch(() => {
            console.error("Could not find project in Archived Projects");
          });
        axios.delete("Projects/" + pTitle + ".json").catch(() => {
          console.error("Error removing project from Active Projects");
        });
      })
      .catch(() => {
        console.error("Could not find project in Active Projects");
      });
  } else {
    axios
      .get("ArchivedProjects/" + pTitle + ".json")
      .then(res => {
        const activating = res.data;
        axios.put("Projects/" + pTitle + ".json", activating).catch(() => {
          console.error("Could not find Active Project");
        });
        axios.delete("ArchivedProjects/" + pTitle + ".json").catch(() => {
          console.error("Error removing Archived Project");
        });
      })
      .catch(() => {
        console.error("Could not find Archived Project");
      });
  }
  return {
    type: actionTypes.UPDATE_ARCHIVE_STATUS,
    status: status,
    pTitle: pTitle
  };
};

export const addArchiveStatus = (status, pTitle) => {
  return {
    type: actionTypes.UPDATE_ARCHIVE_STATUS,
    status: status,
    pTitle: pTitle
  };
};
