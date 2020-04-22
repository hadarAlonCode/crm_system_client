// @ts-nocheck
import React, { Component } from 'react';
//routs
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
//redux
import { connect } from "react-redux";
import * as actions from '../../actions/actions';
import { removeCookie } from '../../tools/cookie/cookie';
import LOGO from "../../tools/images/w_logo_crm.png"

import Fade from 'react-reveal/Fade';


class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            selected_tab: "Overview",
            tabs: ["Overview", "Tasks", "Contacts", "Logout"],
            toggle_mobile_nav: false,
            open_mobile_nav: false

        }
    }

    componentDidMount() {
        const { tabs } = this.state
        let innerWidth = window.innerWidth;


        if(innerWidth <= 1000){
            this.toggleMobileNav(true)
        }else{
            this.toggleMobileNav(false)
        }


        for (let tab of tabs) {
            if (window.location.pathname.includes(tab.toLowerCase())) {
                this.setState({
                    selected_tab: tab
                })
            }
        }

        window.addEventListener("resize", this.onResize);
    }

    onResize =()=>{
        let innerWidth = window.innerWidth;

        if(innerWidth <= 1000){
            this.toggleMobileNav(true)
        }else{
            this.toggleMobileNav(false)
        }
    }


    toggleMobileNav=(boolean)=>{

        this.setState({
            toggle_mobile_nav: boolean
        })
    }


    selectTab = (tab_name) => {
        this.setState({
            selected_tab: tab_name,
            open_mobile_nav: false
        })

        document.body.style.overflowY = "auto" 
    }


    logout = () => {
        removeCookie("login_cookie")
        window.location.href = '/login'
        document.body.style.overflowY = "auto"
    }


    toggleOpenMobileNav =()=>{
        const {open_mobile_nav} = this.state


        if(open_mobile_nav){
            document.body.style.overflowY = "auto"
        }else{
            document.body.style.overflowY = "hidden"
        }


        this.setState({
            open_mobile_nav: !open_mobile_nav
        })
    }

    


    render() {

        const { selected_tab, tabs , toggle_mobile_nav, open_mobile_nav} = this.state

        return (
            <div className={toggle_mobile_nav ? "navbar__container mobile__navbar__container" : "navbar__container" }>
                <div onClick={toggle_mobile_nav ? ()=> this.toggleOpenMobileNav() :  null}  className="logo">
                    {toggle_mobile_nav ? 
                        
                        <button className={open_mobile_nav  ? "hamburger hamburger--squeeze is-active"  :"hamburger hamburger--squeeze" } type="button">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>  
                        :
                        <Fade top delay={100} duration={3000} > <img src={LOGO} alt="logo" height="55" width="55"></img></Fade>

                        }
                    
                    </div>

                <ul id={open_mobile_nav ? "mobile__navbar--active" : "mobile__navbar--off" }  className="navbar__list">
                
                <Fade left delay={100} duration={2500}> 
                    <li onClick={() => this.selectTab(tabs[0])} className={selected_tab === tabs[0] ? "selected__tab" : null}>
                        <Link to={`/dashboard/overview`}> <i className="fas fa-cube"></i><div>{tabs[0]}</div></Link>
                    </li>           
                </Fade>
                
                <Fade left delay={100} duration={2500} > 
                    <li onClick={() => this.selectTab(tabs[1])} className={selected_tab === tabs[1] ? "selected__tab" : null}>
                        <Link to={`/dashboard/tasks`}> <i className="fas fa-tasks"></i><div>{tabs[1]}</div></Link>
                    </li>
                </Fade>
               
                <Fade left delay={100} duration={2500} > 
                    <li onClick={() => this.selectTab(tabs[3])} className={selected_tab === tabs[2] ? "selected__tab" : null} >
                        <Link to={`/dashboard/contacts`}><i className="far fa-address-book"></i><div>{tabs[2]}</div></Link>
                    </li>
                </Fade>

                <Fade left delay={100} duration={2500} > 
                    <li className="logout__tab" onClick={() => this.logout()}><i className="fas fa-sign-out-alt"></i><div>{tabs[3]}</div></li>
                </Fade>
                
                </ul>
            </div>
        );
    }
}




function mapStateToProps({ login, router }) {
    return { login, router };
}

export default withRouter(connect(mapStateToProps, actions)(NavBar))