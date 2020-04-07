import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter, Router } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLaptopCode,
  faDollarSign,
  faFire,
  faHeart
} from "@fortawesome/free-solid-svg-icons";

import Layout from "./components/Layout/Layout";
// import LongInfo from './components/LongInfo/LongInfo';

import LandingPage from "./components/LandingPage/LandingPage";
import About from "./components/About/About";
import ContactUs from "./components/ContactUs/ContactUs";
import RouteError from "./components/RouteError/RouteError";
import ProjectFullDetail from "./components/ProjectFullDetail/ProjectFullDetail";
import ViewProjects from "./components/ViewProjects/ViewProjects";
import Console from "./components/Console/Console";

import CSignIn from "./components/ClaraLogin/CSignIn";
import CLogin from "./components/ClaraLogin/CLogin";
import Profile from "./components/ClaraLogin/Profile";


import * as authActions from "./store/actions/auth";

library.add(faLaptopCode, faDollarSign, faFire, faHeart);

class App extends Component {
  componentDidMount() {
    this.props.autoSignIn();
  }
  render() {
    let routes = (
      // <Router>
        <Switch>


          <Route path="/signin" component={CSignIn} /> 
          <Route path="/profile" component={Profile} />
          {/* fix this late riognwejkgwejkgnwe */}
          <Route path="/login" component={CLogin} />
          <Route exact path="/" component={CSignIn} /> 

          {/* <Route path="/test" component={this.props.auth.signedIn ? Console : RouteError}  />
        <Route path="/CLogin" component={CLogin} />
        <Route path="/ViewProjects" component={ViewProjects} />
        <Route path="/ProjectFullDetail" component={ProjectFullDetail} />
        <Route path="/About" component={About} />
        <Route path="/ContactUs" component={ContactUs} />
        {this.props.auth.signedIn ? <Route path="/Console" component={Console} /> : null}
        <Route path="/" exact component={LandingPage} />
        <Route path="/RouteError" component={RouteError} />
        <Redirect to="/RouteError" /> */}
        </Switch>
      // </Router>
    );

    return (
      <div>
        {/* <Layout> */}
        {routes}
        {/* </Layout> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    autoSignIn: () => dispatch(authActions.checkAuthToken())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
