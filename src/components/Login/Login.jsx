import React, { Component } from 'react';
import { loginApi } from '../../tools/functions/api/login_api';
import { setCookie } from '../../tools/cookie/cookie';
import { connect } from "react-redux";
import * as actions from '../../actions/actions';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { DASHBOARD_OVERVIEW } from '../../tools/routs';
import LOGO from "../../tools/images/logo_crm.png"
import Flip  from 'react-reveal/Fade';
import { gsap } from "gsap";
let tl = gsap.timeline();


class Login extends Component {

    constructor(){
        super()
        this.state={
            login_validation: true
        }
    }

    componentDidMount(){
        
        // === logo animation:
        const logo = document.getElementById("logo__container");
        tl.to(logo, {duration: 2, rotation: 360 ,ease: "power3.out", delay: 0.7, });

       
    }


    handleChange =(e)=>{
        let name =  e.target.name
        let value = e.target.value
        this.setState({
            [name] : value,
            login_validation: true
        })
    }

    login = async()=>{
        const {email, password} = this.state

        let body ={
            email,
            password
        }

        let res = await loginApi(body)
        if(res.ok){
            setCookie("login_cookie" ,res.result.token )
            this.props.setUserData(res.result)
            this.props.history.push(DASHBOARD_OVERVIEW)

            this.setState({
                login_validation: true
            })

        }else {
            this.setState({
                login_validation: false
            })
        }
    }


    render() {
        const {login_validation} = this.state

        return (
            
            <div className="login__container">
                 <Flip delay={500} >
                <div id="login__inner__container" className="login__inner__container">

                    <div id="logo__container" className="logo__container"><img src={LOGO} alt="logo" height="100" width="100"></img></div>
                    
                    <div className="input__container"><span>Email</span><input onChange={(e)=>this.handleChange(e)} type="text" name="email"></input></div>
                    <div className="input__container"><span>Password</span> <input onChange={(e)=>this.handleChange(e)} type="password" name="password"></input></div>
                   
                    <button className="btn" onClick ={()=> this.login()}>Login</button>
                    {login_validation ? null : <div className="err__text">{"Username or password incorrect"}</div>}
                 </div>
                 </Flip>

                 <Flip left delay={500} >
                 <div className="login__demo__user">
                     <h2>Demo User</h2>
                     <div>Email: demo@gmail.com</div>
                     <div>Password: demo</div>
                 </div>
                 </Flip>
            </div>
           
        );
    }
}


function mapStateToProps({ login }) {
    return { login };
  }
  
  export default withRouter(connect(mapStateToProps, actions)(Login))