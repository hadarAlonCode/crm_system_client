import React, { Component } from 'react';
import { loginApi, registerApi } from '../../tools/functions/api/login_api';
import { setCookie } from '../../tools/cookie/cookie';
import { connect } from "react-redux";
import * as actions from '../../actions/actions';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { DASHBOARD_OVERVIEW } from '../../tools/routs';
import LOGO from "../../tools/images/logo_crm.png"
import Flip  from 'react-reveal/Fade';
import Fade  from 'react-reveal/Fade';
import validator from 'validator';


import { gsap } from "gsap";
import Confetti from "../confetti/Confetti";
import Loader from '../Loader/Loader';

let tl = gsap.timeline();

class Login extends Component {

    constructor(){
        super()
        this.state={
            login_validation: true,
            user_already_exists: false,
            login_step: 2,  // === 1: register, 2: login
            email:'',
            password:'',
            new_register: false,

            signFunc: this.login,
            sign_text:[ 'Login', 'Need an account?' , 'Sign Up'],
            loader_toggle: false

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
            
        })
        this.resetValidation()
    }


    
    login = async()=>{
        const {email, password} = this.state

        this.setState({
            loader_toggle:true 
        })

        let body ={
            email,
            password
        }

        let res = await loginApi(body)
        if(res.ok){
            
            this.setUserDataState(res)

        }else {
            this.setState({
                login_validation: false,
                loader_toggle: false 
            })
        }
    }


    
    register = async ()=>{
        const {email, password} = this.state

        this.setState({
            loader_toggle:true 
        })

        if(this.inputValidation()){

            let body = {
                email,
                password,
                user_key: email
            }

            let res = await registerApi(body)

            if(res.result === "USER_ERROR_USER_ALREADY_EXISTS"){
                return this.setState({
                    user_already_exists: true
                })
            }
            
            if(res.ok){

                this.setState({
                    new_register: true,
                    loader_toggle:false 
                })

                setTimeout(()=>{ this.setUserDataState(res) }, 3000);

                    
                

            }else {
                this.setState({
                    login_validation: false
                })
            }
        } 
    }



    inputValidation =()=>{
        const { email, password } = this.state
        console.log(!validator.isEmail(email))

        if (!validator.isEmail(email)) {

            this.setState({
                login_validation: false
            })

            return false
        }


        if ( password.trim() === '' ) {
            this.setState({
                login_validation: false
            })
            return false
        }

        return true


    }



    setUserDataState =(res)=>{
        setCookie("login_cookie" ,res.result.token )
        const {setUserData , history} = this.props
        setUserData(res.result)
        history.push(DASHBOARD_OVERVIEW)

        this.setState({
            login_validation: true
        })
    }


    toggleSign =(num)=>{
        const {login_step} = this.state

        if(login_step === 2) {

            this.setState({
                login_step: 1,
                signFunc: this.register,
                sign_text:[ 'Register', 'Already have an account?' , 'Sign In'],
                email:'',
                password:'',
            })

        }else{

            this.setState({
                login_step: 2,
                signFunc: this.login,
                sign_text:[ 'Login', 'Need an account?' , 'Sign Up'],
                email:'',
                password:'',
            })    
        }

        this.resetValidation()
    }



    resetValidation=()=>{
        this.setState({
            user_already_exists: false,
            login_validation: true,
            
        })
    }


    render() {
        const {
            loader_toggle,
            signFunc,
            sign_text,
            login_validation,
            login_step,
            email,
            password, 
            user_already_exists, 
            new_register} = this.state

        return (
            
            <div className="login__container">
                 <Flip delay={500} >
                <div id="login__inner__container" className="login__inner__container">

                    <div id="logo__container" className="logo__container"><img src={LOGO} alt="logo" height="100" width="100"></img></div>
                    
                    <div className="input__container"><span>Email</span><input value={email} onChange={(e)=>this.handleChange(e)} type="text" name="email"></input></div>
                    <div className="input__container"><span>Password</span> <input  value={password} onChange={(e)=>this.handleChange(e)} type="password" name="password"></input></div>
           
                    <div>
                        {loader_toggle ?
                            <Loader /> 
                            :
                            <button className="btn" onClick ={()=> signFunc()}>{sign_text[0]}</button> 
                        }
                        <div className="sign__question">{sign_text[1]}</div>
                        <div className="sign__link"onClick={()=>this.toggleSign(1)}>{sign_text[2]}</div>       
                     </div>

                    {login_validation ? null : <div className="err__text">{"Email or password incorrect"}</div>}
                    {user_already_exists ? <div className="err__text">{"User already exists"}</div> : null }
                    
                 </div>
                 </Flip>

                 <Flip left delay={500} >
                 <div className="login__demo__user">
                     <h2>Demo User</h2>
                     <div>Email: demo@gmail.com</div>
                     <div>Password: demo</div>
                 </div>
                 </Flip>

                 {new_register ? 
                  <div className="confetti"> <Confetti />
                    <div className="new__acount__msg">
                        <div style={{fontWeight: 'bold'}}>Congratulations ! </div>
                        <div className="new__acount__text">Your account has been created</div>
                    </div>  
                 </div> : null}

            </div>
           
        );
    }
}


function mapStateToProps({ login }) {
    return { login };
  }
  
  export default withRouter(connect(mapStateToProps, actions)(Login))