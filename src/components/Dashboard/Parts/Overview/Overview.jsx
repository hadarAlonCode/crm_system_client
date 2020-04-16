import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import * as actions from '../../../../actions/actions';


class Overview extends Component {

    constructor(){
        super()
        this.state ={
            user_key: '' 
        }
    }



    // componentDidMount(prevProps){
    //     const {user_key} = this.props.login
       
    //     this.setState({
    //         user_key: user_key
    //     })
    // }

    // componentDidUpdate(prevProps){
    //     const {user_key} = this.props.login
       
    //     this.setState({
    //         user_key: user_key
    //     })
    // }


    render() {
        console.log(this.props.login)
        return (
            <div>
                Overview
            </div>
        );
    }
}



function mapStateToProps({ login }) {
    return { login };
  }
  
  export default withRouter(connect(mapStateToProps, actions)(Overview))