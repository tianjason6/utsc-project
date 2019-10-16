import axios from '../../axios-projects';
import * as actionTypes from './actionTypes';

export const setTimeline = (timeline) => {
    return {
        type: actionTypes.SET_TIMELINE,
        timeline: timeline
    }
}

export const fetchTimeline = () => {
    return dispatch => {
        axios.get('https://utsc-projects.firebaseio.com/Timeline.json')
        .then(res => {
            dispatch(setTimeline(res.data))
        });
    }
}