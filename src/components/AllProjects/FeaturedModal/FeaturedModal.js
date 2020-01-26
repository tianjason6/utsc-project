import React, { Component } from 'react';
import { connect } from "react-redux";
import * as FeaturedProjectActions from '../../../store/actions/featuredProjects';
import * as archiveStatusActions from '../../../store/actions/archiveStatus';
import * as modalActions from '../../../store/actions/modal';

class FeaturedModal extends Component {
    removeFeatured = () => {
        this.props.removeFeaturedProject(this.props.modalProps.newFeaturedList);
        this.props.changeArchiveStatus(true, this.props.modalProps.projectTitle);
        this.props.hideModal();
    }

    render() {
        return (
            <div>
                <p>Delete {this.props.modalProps.projectTitle} from Featured Projects?</p>
                <button onClick={() => {
                    this.removeFeatured()
                }}>
                    Yes
            </button>
                <button onClick={() => this.props.hideModal()}>
                    No
            </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.modalReducer.showModal,
        modalProps: state.modalReducer.modalProps
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeArchiveStatus: (status, pTitle) => dispatch(archiveStatusActions.changeArchiveStatus(status, pTitle)),
        removeFeaturedProject: (newFeaturedList) => dispatch(FeaturedProjectActions.removeFeaturedProject(newFeaturedList)),
        hideModal: () => dispatch(modalActions.hideModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(FeaturedModal);