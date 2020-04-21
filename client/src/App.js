import React, { Component } from "react";

//routs
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { Redirect } from "react-router";
//redux
import { connect } from "react-redux";
import * as actions from './actions/actions';

//components
import Login from './components/Login/Login.jsx';
import Redirector from "./components/Redirector/Redirector.jsx";
import Tasks from "./components/Dashboard/Parts/Tasks/Tasks";
import Contacts from "./components/Dashboard/Parts/Contacts/Contacts";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import { LOGIN, DASHBOARD } from "./tools/routs";



// all the routs in app components - 
//redirector - make the login - check if cookie--> go to dashboard or anoter location history -- else --> go to login page.
// if login --> go to dashboard



class App extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {

  }


  render() {

    return (
      <div className="App">


        <Router>
          <Route exact path={LOGIN} exact component={Login} />
          <Route path={DASHBOARD} render={() => <Dashboard history={this.props.history} />} />
          <Route exact path={'/'} render={() => <Redirector history={this.props.history} />} />
        </Router>

      </div>
    )
  }
}



function mapStateToProps({ login }) {
  return { login };
}

export default withRouter(connect(mapStateToProps, actions)(App))