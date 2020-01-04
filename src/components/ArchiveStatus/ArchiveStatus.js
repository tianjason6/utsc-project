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
        console.log("Archive status button", this.state.projectTitle);
        return (
            <button className={styles.ContentButton} onClick={() => {
                axios.get("Projects/" + this.state.projectTitle + ".json").then(res => {
                    const archiving = res.data;
                    Promise.resolve(archiving).then(projectData => {
                        console.log("project data: ", projectData)
                        axios.put("ArchivedProjects/" + this.state.projectTitle + ".json", projectData).then(res => {
                            console.log("response to putting in archive: ", res)
                        })
                    })
                })
            }}> Archive </button>
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