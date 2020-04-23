import React from "react";
import styles from "./TimelineItem.module.css";

const timelineItem = (props) => (
  <div className={styles.timeline}>
    <div className={styles.timelineItem}>
      <div className={styles.banner}>
        <p className={styles.timelineDetails}>
          {" "}
          posted by: <strong>{props.username}</strong>{" "}
        </p>
        <p className={styles.timelineDetails}>
          {props.date} at {props.time}{" "}
        </p>
      </div>
      <div className={styles.timelineBody}>
        <h2 className={styles.timelineTitle}>{props.title}</h2>
        <p className={styles.timelineContent}>{props.content}</p>
      </div>
      {props.attachment && (
        <img
          className={styles.timelineImg}
          src={
            "https://firebasestorage.googleapis.com/v0/b/utsc-projects.appspot.com/o/timeline%2F" +
            props.id +
            "?alt=media"
          }
          alt={"timeline item"}
        />
      )}
    </div>
  </div>
);

export default timelineItem;
