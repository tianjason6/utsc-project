import React, { Component } from 'react'; 
import { connect } from 'react-redux';

import styles from './Timeline.module.css';
import * as timelineAction from '../../store/actions/timeline';

import TimelineItem from './TimelineItem/TimelineItem';

import { NavLink } from 'react-router-dom';
import AddToTimelineForm from './AddTimelineForm/AddTimelineForm';

class Timeline extends Component {
    componentDidMount() {
        this.props.fetchTimeline();
    }
    render(){
        let superUser;
        if(this.props.loggedInUser){
            if(this.props.loggedInUser.isAdmin){
                // superUser = <NavLink className={styles.addTimeline} to={'/test/AddTimeLine'}>
                //                 + Add To Timeline
                //             </NavLink>
                superUser = <AddToTimelineForm className={styles.container} />
            }
        }

        let timeline = this.props.timeline.map(element => (
            <TimelineItem 
                title={element.title}
                date={element.date}
                username={element.username}
                content={element.content}
            />
        ));
        return(
            <div className={styles.Background}>
                <div className={styles.container}>
                    <h1>Timeline</h1>
                    {superUser}
                    {timeline}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.authReducer,
        timeline: state.timelineReducer.timeline,
        loggedInUser: state.loggedInUserReducer.loggedInUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTimeline: () => dispatch(timelineAction.fetchTimeline()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);