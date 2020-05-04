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
import Confetti from '../confetti/Confetti';

let tl = gsap.timeline();

class Login extends Component {

    constructor(){
        super()
        this.state={
            login_validation: true,
            user_already_exists: false,
            login_step: 2,  // 1: register, 2: login
            email:'',
            password:'',
            new_register: false
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

        let body ={
            email,
            password
        }

        let res = await loginApi(body)
        if(res.ok){
            
            this.setUserDataState(res)

        }else {
            this.setState({
                login_validation: false
            })
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




   register = async ()=>{
        const {email, password} = this.state

        if(this.inputValidation()){

            let body = {
                email,
                password,
                user_key:email
            }
    
            let res = await registerApi(body)
    
            if(res.result === "USER_ERROR_USER_ALREADY_EXISTS"){
                return this.setState({
                    user_already_exists: true
                })
            }
            
            if(res.ok){

                this.setState({
                    new_register: true
                })

                setTimeout(()=>{ this.setUserDataState(res) }, 3000);

                    
                
    
            }else {
                this.setState({
                    login_validation: false
                })
            }
        } 
   }



   setUserDataState =(res)=>{
    setCookie("login_cookie" ,res.result.token )
    this.props.setUserData(res.result)
    this.props.history.push(DASHBOARD_OVERVIEW)

    this.setState({
        login_validation: true
    })
}


    toggleSign =(num)=>{
        this.setState({
            login_step: num,
            email:'',
            password:'',
        })
        this.resetValidation()
    }



    resetValidation=()=>{
        this.setState({
            user_already_exists: false,
            login_validation: true,
            
        })
    }


    render() {
        const {login_validation, login_step, email, password, user_already_exists, new_register} = this.state

        return (
            
            <div className="login__container">
                 <Flip delay={500} >
                <div id="login__inner__container" className="login__inner__container">

                    <div id="logo__container" className="logo__container"><img src={LOGO} alt="logo" height="100" width="100"></img></div>
                    
                    <div className="input__container"><span>Email</span><input value={email} onChange={(e)=>this.handleChange(e)} type="text" name="email"></input></div>
                    <div className="input__container"><span>Password</span> <input  value={password} onChange={(e)=>this.handleChange(e)} type="password" name="password"></input></div>
      
                    {login_step === 2 ? 
                    <div>
                        <button className="btn" onClick ={()=> this.login()}>Login</button> 
                        <div className="sign__question">Need an account?</div>
                        <div className="sign__link"onClick={()=>this.toggleSign(1)}>Sign Up</div>   
                        
                     </div>
                    :
                    <div>
                        <button className="btn" onClick ={()=> this.register()}>Register</button> 
                        <div className="sign__question">Already have an account?</div>   
                        <div className="sign__link" onClick={()=>this.toggleSign(2)}>Sign In</div>
                    </div>
                   
                  }

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