import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import * as actions from '../../../../actions/actions';
import DataBox from './Parts/DataBox/DataBox';
import { getAllContacts, getFilterContacts } from '../../../../tools/functions/api/contacts_api';


class Overview extends Component {

    constructor(){
        super()
        this.state ={
            contacts: [],
            sold_contacts: []
        }
    }


   async componentDidMount(){
        const {user_key} = this.props.login
       
        let constcts_res = await getAllContacts(user_key)
               if(constcts_res.ok){

                    this.setState({
                        contacts: constcts_res.result
                    })
                }     
         

                
        let sold_conatcts_res = await getFilterContacts(user_key, "status" , "sold") 
                if(sold_conatcts_res.ok){

                    this.setState({
                        sold_contacts: sold_conatcts_res.result
                    } ,()=>{
                        let load_page_res =  this.getSalesPercentage()
                        if(load_page_res){
                            this.setState({
                                load: true
                            })
                        }
                    })
                }else{
                    
                    let load_page_res =  this.getSalesPercentage()
                        if(load_page_res){
                            this.setState({
                                load: true
                            })
                        }
                }  
                
                
    }



     percentage = (partialValue, totalValue) => {
        return (100 * partialValue) / totalValue;
     }


    getSalesPercentage =()=>{
        const {contacts , sold_contacts} = this.state

        let all_contact_number = contacts.length
        let sold_contact_number = sold_contacts.length

        let sold_percentage =  this.percentage(sold_contact_number, all_contact_number).toFixed(1) 
        console.log(sold_percentage)

        this.setState({
            sold_percentage,

        })

        return true

       


    }







    render() {
        const {contacts, sold_percentage, load} = this.state
        
        return (
            load ?
            <div className="overview__container">
                
                <DataBox value={sold_percentage} data_text={"closed deals"} value_type={"%"}  />
            </div>

            : null
        );
    }
}



function mapStateToProps({ login }) {
    return { login };
  }
  
  export default withRouter(connect(mapStateToProps, actions)(Overview))