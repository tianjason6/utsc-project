import * as actionTypes from "./actionTypes";
import axios from "../../axios-projects";

export const changeArchiveStatus = (status, pTitle) => {
    if (status) {
        axios.get("Projects/" + pTitle + ".json").then(res => {
            const archiving = res.data;
            Promise.resolve(archiving).then(projectData => {
                axios.put("ArchivedProjects/" + pTitle + ".json", projectData).then(res => {
                    console.log("response to moving project to ArchivedProjects.json: ", res)
                    axios.delete("Projects/" + pTitle + ".json").then(res => {
                        console.log("response to deleting in projects: ", res);
                    })
                })
            })
        })
    } else {
        axios.get("ArchivedProjects/" + pTitle + ".json").then(res => {
            const archiving = res.data;
            Promise.resolve(archiving).then(projectData => {
                axios.put("Projects/" + pTitle + ".json", projectData).then(res => {
                    console.log("response to moving project to Projects.json: ", res)
                    axios.delete("ArchivedProjects/" + pTitle + ".json").then(res => {
                        console.log("response to deleting in archives: ", res);
                    })
                })
            })
        })
    }
    return {
        type: actionTypes.UPDATE_ARCHIVE_STATUS,
        status: status,
        pTitle: pTitle
    }
}

export const addArchiveStatus = (status, pTitle) => {
    return {
        type: actionTypes.UPDATE_ARCHIVE_STATUS,
        status: status,
        pTitle: pTitle
    }
}

export const setArchiveStatus = (projects) => {
    return (dispatch) => {
        projects.forEach(project => {
            const pTitle = project.data.title
            axios.get("Projects/" + pTitle + ".json").then(res => {
                const archiving = res.data;
                Promise.resolve(archiving).then(projectData => {
                    if (projectData === null) {
                        dispatch(addArchiveStatus(true, pTitle))
                    } else {
                        dispatch(addArchiveStatus(false, pTitle))
                    }
                })
            })
        })
    }
}