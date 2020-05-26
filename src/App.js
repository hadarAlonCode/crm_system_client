import React, { Component } from "react";
//routes
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
//redux
import { connect } from "react-redux";
import * as actions from './actions/actions';
//components
import Login from './components/Login/Login.jsx';
import Redirector from "./components/Redirector/Redirector.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import { LOGIN, DASHBOARD } from "./tools/routs";



class App extends Component {

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