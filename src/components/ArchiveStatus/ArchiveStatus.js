import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "../../axios-projects";
import styles from "./ArchiveStatus.module.css";

class ArchiveButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectTitle: this.props.projectTitle
        }
    }

    render() {
        return (
            <div>
                <button className={styles.ContentButton} onClick={() => {
                    axios.get("Projects/" + this.state.projectTitle + ".json").then(res => {
                        const archiving = res.data;
                        Promise.resolve(archiving).then(projectData => {
                            axios.put("ArchivedProjects/" + this.state.projectTitle + ".json", projectData).then(res => {
                                console.log("response to putting in archives: ", res)
                                axios.delete("Projects/" + this.state.projectTitle + ".json").then(res => {
                                    console.log("response to deleting in projects: ", res);
                                })
                            })
                        })
                    })
                }}> Archive </button>
                <button className={styles.ContentButton} onClick={() => {
                    axios.get("ArchivedProjects/" + this.state.projectTitle + ".json").then(res => {
                        const archiving = res.data;
                        Promise.resolve(archiving).then(projectData => {
                            axios.put("Projects/" + this.state.projectTitle + ".json", projectData).then(res => {
                                console.log("response to putting in projects: ", res)
                                axios.delete("ArchivedProjects/" + this.state.projectTitle + ".json").then(res => {
                                    console.log("response to deleting in archives: ", res);
                                })
                            })
                        })
                    })
                }}> Activate </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.loggedInUserReducer.loggedInUser,
        project: state.projectReducer.project
    }
}

export default connect(mapStateToProps, null)(ArchiveButton);