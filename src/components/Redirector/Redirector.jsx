import React, { Component } from 'react';
//redux
import { connect } from "react-redux";
import * as actions from '../../actions/actions';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { DASHBOARD_OVERVIEW } from '../../tools/routs';
//redirector - make the login - check if cookie--> go to dashboard or anoter location history -- else --> go to login page.

class Redirector extends Component {
    constructor() {
        super()
        this.state = {
            login: true
        }
    }

    componentDidMount() {
        const { login } = this.state
        if (login) {
            this.props.history.push(DASHBOARD_OVERVIEW)
        }
    }

    render() {
        console.log("Redirector")
        return (
            <div >

            </div>
        );
    }
}


function mapStateToProps({ login }) {
    return { login };
}

export default withRouter(connect(mapStateToProps, actions)(Redirector))