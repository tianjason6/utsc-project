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

export const addToTimeline = (date, time, username, content, id, file=null) => {
    
    return dispatch => {
        axios.get('https://utsc-projects.firebaseio.com/Timeline.json')
            .then(res => {
                content.date = date;
                content.time = time;
                content.username = username;
                content.id = id;
                content.attachment = (file!=null)
                if(res.data){
                    const timelineArray = res.data;
                    timelineArray.unshift(content);
                    console.log(timelineArray);
                    axios.put('Timeline.json', timelineArray);
                } else {
                    axios.put('Timeline.json', [content]);
                }
            });
    }
    
    
}