import React, { Component } from "react";
import { connect } from "react-redux";

import styles from "./Timeline.module.css";
import * as timelineAction from "../../store/actions/timeline";

import TimelineItem from "./TimelineItem/TimelineItem";



// this is a new line 
// just to see what happens
import AddToTimelineForm from "./AddTimelineForm/AddTimelineForm";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      showModal: false,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.props.fetchTimeline();
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  changePage = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    let superUser;

    if (this.props.loggedInUser) {
      if (this.props.loggedInUser.isAdmin) {
        superUser = (
          <>
            <div
              className={styles.addTimelineBtn}
              onClick={() => this.toggleModal()}
            >
              Post To Timeline +{" "}
            </div>
            <Modal
              show={this.state.showModal}
              closeModal={this.toggleModal}
              style={styles.modalStyle}
            >
              <AddToTimelineForm className={styles.container} />
            </Modal>
          </>
        );
      }
    }
    let timeline = <h1>Loading... </h1>;
    let totalPages = (
      <div className={styles.paginationItem} onClick={() => this.changePage(1)}>
        {1}
      </div>
    );

    if (this.props.timeline) {
      timeline = [];
      totalPages = [];
      let element;

      for (
        let i = (this.state.currentPage - 1) * 10;
        i < (this.state.currentPage - 1) * 10 + 10 &&
        i < this.props.timeline.length;
        i++
      ) {
        element = this.props.timeline[i];
        timeline.push(
          <TimelineItem
            key={element.id}
            title={element.title}
            date={element.date}
            time={element.time}
            username={element.username}
            content={element.content}
            attachment={element.attachment}
            id={element.id}
          />
        );
      }

      for (
        let i = 1;
        i <= Math.floor((this.props.timeline.length - 1) / 10) + 1;
        i++
      ) {
        if (i === this.state.currentPage) {
          totalPages.push(
            <div
              key={i}
              className={[
                styles.paginationItem,
                styles.activePaginationItem,
              ].join(" ")}
              onClick={() => this.changePage(i)}
            >
              {i}
            </div>
          );
        } else {
          totalPages.push(
            <div
              key={i}
              className={styles.paginationItem}
              onClick={() => this.changePage(i)}
            >
              {i}
            </div>
          );
        }
      }
    } else {
      timeline = <h1>No Timeline Posts Yet! </h1>;
    }

    return (
      <div className={styles.Background}>
        <div className={styles.container}>
          <h1>Timeline</h1>
          {superUser}
          <button
            className={styles.addTimelineBtn}
            onClick={this.props.fetchTimeline}
          >
            {" "}
            Check for Updates
          </button>
          {timeline}
          <h3>Pages</h3>
          <div className={styles.pagination}>{totalPages}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.authReducer,
    timeline: state.timelineReducer.timeline,
    loggedInUser: state.loggedInUserReducer.loggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTimeline: () => dispatch(timelineAction.fetchTimeline()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
