import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from "./ArchiveStatus.module.css";
import * as archiveStatus from "../../store/actions/archiveStatus";
import * as modal from "../../store/actions/modal";
import axios from "../../axios-projects";

class ArchiveButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projectTitle: this.props.projectTitle
        }
    }

    isFeatured = (pTitle) => {
        axios.get("FeaturedProjects.json").then(res => {
            const featuredList = res.data;
            Promise.resolve(featuredList)
                .then(list => {
                    if (list.length > 0) {
                        for (let i = list.length; i--;) {
                            if (pTitle === list[i]) {
                                list.splice(i, 1);
                                return this.props.showRemoveFromFeaturedModal(pTitle, list);
                            } else if (i === 0) {
                                this.props.changeArchiveStatus(true, pTitle);
                            };
                        }
                    }
                }).catch(() => { console.log("FeaturedProjects.json is empty") });
        }).catch(() => { console.log("FeaturedProjects.json cannot be accessed or does not exist") });
    }

    archiveButton() {
        if (!this.props.isArchived[this.state.projectTitle]) {
            return <button id={"archive" + this.state.projectTitle} className={styles.ContentButton} onClick={() => { this.isFeatured(this.state.projectTitle) }}> Archive </button>
        } else {
            return <button id={"activate" + this.state.projectTitle} className={styles.ContentButton} onClick={() => { this.props.changeArchiveStatus(false, this.state.projectTitle) }}> Activate </button>
        }
    }

    render() {
        return (
            <div>
                {this.archiveButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isArchived: state.archiveStatusReducer.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeArchiveStatus: (status, pTitle) => dispatch(archiveStatus.changeArchiveStatus(status, pTitle)),
        showRemoveFromFeaturedModal: (pTitle, newList) => dispatch(modal.showRemoveFromFeaturedModal(pTitle, newList))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveButton);