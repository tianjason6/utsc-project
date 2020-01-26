import * as actionTypes from "./actionTypes";
import axios from "../../axios-projects";

// can optimize this later
export const changeArchiveStatus = (status, pTitle) => {
    if (status) {
        // archive
        axios.get("Projects/" + pTitle + ".json")
            .then(projectData => {
                const archiving = projectData.data;
                Promise.resolve(archiving)
                    .then(projectData => {
                        axios.put("ArchivedProjects/" + pTitle + ".json", projectData)
                            .then(res => {
                                console.log("response to moving project to ArchivedProjects.json: ", res)
                                axios.delete("Projects/" + pTitle + ".json")
                                    .then(res => {
                                        console.log("response to deleting in projects: ", res);
                                    })
                                    .catch(() => { console.log("Could not find project in Projects.json") })
                            })
                            .catch(() => { console.log("Could not find project in ArchivedProjects") })
                    })
            })
            .catch(() => { console.log("Could not find project") })
    } else {
        axios.get("ArchivedProjects/" + pTitle + ".json").then(res => {
            const archiving = res.data;
            Promise.resolve(archiving).then(projectData => {
                axios.put("Projects/" + pTitle + ".json", projectData).then(res => {
                    console.log("response to moving project to Projects.json: ", res)
                    axios.delete("ArchivedProjects/" + pTitle + ".json").then(res => {
                        console.log("response to deleting in archives: ", res);
                    }).catch(() => { console.log("Could not find archived project to remove") })
                }).catch(() => { console.log("Could not find project to move in Projects") })
            })
        }).catch(() => { console.log("Could not find archived project") })
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