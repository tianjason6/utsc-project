import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLaptopCode, faDollarSign, faFire, faHeart } from '@fortawesome/free-solid-svg-icons';

import Layout from './components/Layout/Layout';
import LongInfo from './components/LongInfo/LongInfo';

import LandingPage from './components/LandingPage/LandingPage';
import About from './components/About/About';
import ContactUs from './components/ContactUs/ContactUs';
import RouteError from './components/RouteError/RouteError';
import ProjectFullDetail from './components/ProjectFullDetail/ProjectFullDetail';
import ViewProjects from './components/ViewProjects/ViewProjects';
import Console from './components/Console/Console';

library.add(faLaptopCode, faDollarSign, faFire, faHeart);

class App extends Component {
  render() {

    let routes = (
      <Switch>
        <Route path="/test" component={Console} />

        <Route path="/ViewProjects" component={ViewProjects} />
        <Route path="/ProjectFullDetail" component={ProjectFullDetail} />
        <Route path="/About" component={About} />
        <Route path="/ContactUs" component={ContactUs} />
        {this.props.auth.signedIn ? <Route path="/Console" component={Console} /> : null}
        <Route path="/" exact component={LandingPage} />
        <Route path="/RouteError" component={RouteError} />
        <Redirect to="/RouteError" />
      </Switch>
    );
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // autoSignIn: () => dispatch(authActions.authCheckState)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
