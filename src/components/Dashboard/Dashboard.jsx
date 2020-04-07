import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Tasks from './Parts/Tasks/Tasks';
import Contacts from './Parts/Contacts/Contacts';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import Overview from './Parts/Overview/Overview';
import { DASHBOARD_OVERVIEW, DASHBOARD_CONTACTS, DASHBOARD_TASKS } from '../../tools/routs';

class Dashboard extends Component {
    render() {
        const { history } = this.props
        return (
            <div className="dashboard__container">
                <Router>
                    <NavBar history={history} />
                    <div className="dashboard">
                        <Route exact path={DASHBOARD_OVERVIEW} component={Overview} />
                        <Route exact path={DASHBOARD_TASKS} component={Tasks} />
                        <Route exact path={DASHBOARD_CONTACTS} component={Contacts} />
                    </div>
                </Router>

            </div>
        );
    }
}

export default Dashboard;