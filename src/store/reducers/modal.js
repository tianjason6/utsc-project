import * as actionTypes from '../actions/actionTypes';

const initialState = {
    showModal: false,
    modalType: null,
    modalProps: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_MODAL:
            return {
                type: actionTypes.SHOW_MODAL,
                showModal: true,
                modalType: action.modalType,
                modalProps: action.modalProps
            }
        case actionTypes.HIDE_MODAL:
            return initialState
        default:
            return state;
    }
}

export default reducer;