import React, { Component } from 'react';
//routs
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
//redux
import { connect } from "react-redux";
import * as actions from '../../actions/actions';
class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            selected_tab: "Overview",
            tabs: ["Overview", "Tasks", "Contacts", "Logout"]
        }
    }


    // shouldComponentUpdate() {
    //     console.log(window.location.pathname)
    //     if (window.location.pathname.includes()) {

    //     }
    // }

    selectTab = (tab_name) => {
        this.setState({
            selected_tab: tab_name
        })
    }


    logout = () => {
        window.location.href = '/login'
    }


    render() {

        console.log('Navbar render')

        const { selected_tab, tabs } = this.state

        return (
            <div className="navbar__container">
                <ul>
                    <div className="logo">LOGO</div>
                    <li onClick={() => this.selectTab(tabs[0])} className={selected_tab === tabs[0] ? "selected__tab" : null}><Link to={`/dashboard/overview`}> <i className="fas fa-cube"></i><div>{tabs[0]}</div></Link></li>
                    <li onClick={() => this.selectTab(tabs[1])} className={selected_tab === tabs[1] ? "selected__tab" : null}><Link to={`/dashboard/tasks`}> <i className="fas fa-tasks"></i><div>{tabs[1]}</div></Link></li>
                    <li onClick={() => this.selectTab(tabs[2])} className={selected_tab === tabs[2] ? "selected__tab" : null} ><Link to={`/dashboard/contacts`}><i className="far fa-address-book"></i><div>{tabs[2]}</div></Link></li>
                    <li className="logout__tab" onClick={() => this.logout()}><i className="fas fa-sign-out-alt"></i><div>{tabs[3]}</div></li>
                </ul>
            </div>
        );
    }
}




function mapStateToProps({ login, router }) {
    return { login, router };
}

export default withRouter(connect(mapStateToProps, actions)(NavBar))