import React from 'react';
import styles from './TimelineItem.module.css';

const timelineItem = (props) => (
    <div className={styles.timeline}>
        <div className={styles.timelineItem} >
            <div className={styles.timelineDetails}>
                <p className={styles.banner} > posted by: <strong>{props.username}</strong> on {props.date} </p>
            </div>
            <div className={styles.timelineContent}>
                <p>{props.content}</p>
            </div>
        </div>
    </div>
);

export default timelineItem;