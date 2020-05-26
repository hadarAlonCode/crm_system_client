import React, { Component } from 'react';
//redux
import { connect } from "react-redux";
import * as actions from '../../actions/actions';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { DASHBOARD_OVERVIEW , LOGIN} from '../../tools/routs';
import { getCookie } from '../../tools/cookie/cookie';

// === redirector - make the login - check if cookie --> go to dashboard \ location history -- else --> go to login page.

class Redirector extends Component {
    constructor() {
        super()
        this.state = {
            login: true
        }
    }

    componentDidMount() {
        const { login } = this.state

        let token = getCookie("login_cookie" )

        if (token) {
            this.props.history.push(DASHBOARD_OVERVIEW)
        }else{
            this.props.history.push(LOGIN)
        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}


function mapStateToProps({ login }) {
    return { login };
}

export default withRouter(connect(mapStateToProps, actions)(Redirector))