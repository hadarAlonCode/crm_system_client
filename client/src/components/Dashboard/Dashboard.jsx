import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Tasks from './Parts/Tasks/Tasks';
import Contacts from './Parts/Contacts/Contacts';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import Overview from './Parts/Overview/Overview';
import { DASHBOARD_OVERVIEW, DASHBOARD_CONTACTS, DASHBOARD_TASKS, LOGIN } from '../../tools/routs';
import TopBar from '../TopBar/TopBar';
import { getCookie } from '../../tools/cookie/cookie';
import { loginApi } from '../../tools/functions/api/login_api';

import { connect } from "react-redux";
import * as actions from '../../actions/actions';
import Fade  from 'react-reveal/Fade';
import { getAllContacts } from '../../tools/functions/api/contacts_api';


class Dashboard extends Component {

    constructor(){
        super()
        this.state ={
            load_dashboard: false

        }
    }
  

  async  componentDidMount() {
        console.log("componentDidMount")

        let token = getCookie("login_cookie" )

        if (token) {
            let res = await loginApi({email:"", password: ""})
            if (res.ok){
               this.props.setUserData(res.result)
               this.setState({
                load_dashboard: true
            })

            return

               
               // === save all contacts in redux:
               
            //    let constcts_res = await getAllContacts(res.result.user_key)
            //    if(constcts_res.ok){
            //         this.props.getAllContacts(constcts_res.result)

            //         this.setState({
            //             load_dashboard: true
            //         })
            //         return
                    
            //    }else{
            //        alert("500 ERROR")
            //    }

                
            
            }else{
                this.props.history.push(LOGIN) 
            }
            
        }else{
            this.props.history.push(LOGIN)
        }
    }



    render() {
        const { history } = this.props
        const {load_dashboard} = this.state
        console.log("dash")
        return (
            load_dashboard ?
            <Fade>
            <div className="dashboard__container">
                <Router>
                    <NavBar history={history} />
                    <div className="dashboard">
                        <div className="top__nav__back"></div>
                    
                        <Route exact path={DASHBOARD_OVERVIEW} component={Overview} />
                        <Route exact path={DASHBOARD_TASKS} component={Tasks} />
                        <Route exact path={DASHBOARD_CONTACTS} component={Contacts} />
                    </div>
                </Router>
            

            </div>
            </Fade>
            : null
        );
    }
}


function mapStateToProps({ login }) {
    return { login };
  }
  
  export default withRouter(connect(mapStateToProps, actions)(Dashboard))