import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import history from "./history";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import projectsReducer from "./store/reducers/projects";
import projectReducer from "./store/reducers/project";
import featuredProjectsReducer from "./store/reducers/featuredProjects";
import signUpReducer from "./store/reducers/signUp";
import signInReducer from "./store/reducers/signIn";
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/user";
import userManagedProjectsReducer from "./store/reducers/userManagedProjects";
import userJoinedProjectsReducer from "./store/reducers/joinedProjects";
import timelineReducer from "./store/reducers/timeline";
import loggedInUserReducer from "./store/reducers/loggedInUser";
import allProjectsReducer from "./store/reducers/allProjects";
import archiveStatusReducer from "./store/reducers/archiveStatus";
import modalReducer from "./store/reducers/modal";
import submitReducer from "./store/reducers/submit";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  //reducers go here
  authReducer: authReducer,
  featuredProjectsReducer: featuredProjectsReducer,
  form: formReducer,
  loggedInUserReducer: loggedInUserReducer,
  projectsReducer: projectsReducer,
  projectReducer: projectReducer,
  signUpReducer: signUpReducer,
  signInReducer: signInReducer,
  timelineReducer: timelineReducer,
  userJoinedProjectsReducer: userJoinedProjectsReducer,
  userManagedProjectsReducer: userManagedProjectsReducer,
  userReducer: userReducer,
  allProjectsReducer: allProjectsReducer,
  archiveStatusReducer: archiveStatusReducer,
  modalReducer: modalReducer,
  submitReducer: submitReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
