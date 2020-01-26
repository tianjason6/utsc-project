import * as actionTypes from './actionTypes'
export const showRemoveFromFeaturedModal = (projectTitle, newFeaturedList) => {
    return {
        type: actionTypes.SHOW_MODAL,
        modalType: 'CONFIRM_MODAL',
        modalProps: {
            projectTitle: projectTitle,
            newFeaturedList: newFeaturedList
        }
    }
};

export const hideModal = () => {
    return {
        type: actionTypes.HIDE_MODAL
    }
}