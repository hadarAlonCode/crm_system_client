import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import * as actions from '../../../../actions/actions';
import DataBox from './Parts/DataBox/DataBox';
import { getAllContacts, getFilterContacts, getCountGroupContacts } from '../../../../tools/functions/api/contacts_api';
import BarChartBox from './Parts/BarChartBox/BarChartBox.jsx'
import PieChart from './Parts/PieChart/PieChart.jsx'
import Calendar from './Parts/Calendar/Calendar';
import { getAllTasks } from '../../../../tools/functions/api/tasks_api';
import moment from "moment"
import Fade  from 'react-reveal/Fade';



class Overview extends Component {

    constructor(){
        super()
        this.state ={
            contacts: [],
            sold_contacts: [],
            country_chart_data: [], 
            sold_percentage: 0,
            status_chart_data: [],
            events_date: [],
            events:[]
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
                        this.getSalesPercentage()
                        
                    })
                }else{
                    
                     this.getSalesPercentage()
                       
                }
                
                
                this.getCountryChartData()
                this.getStatusChartData()
                this.getAllEvents()
    }



    getCountryChartData =  async ()=>{
        const {user_key} = this.props.login

        let res = await getCountGroupContacts(user_key , "country" )

        let sold_res = await getCountGroupContacts(user_key , "country", "sold" )

        let all_countries_data

        if(res.ok && res.result.length > 0 ){

            // === contacts countries - counter
             all_countries_data = res.result.map(item => {
                 return {name: item._id , contacts: item.count, sold: 0 }
            })

            // === sold deals by countries  - counter
            
            if(sold_res.ok && sold_res.result.length > 0){

                let sold_countries  = sold_res.result

                let copy_all_countries_data = JSON.parse(JSON.stringify(all_countries_data))

            // === combine data: 

                for (let sold_country of sold_countries ){
                
                   let update_item =  copy_all_countries_data.find( item => {return item.name == sold_country._id})
                   update_item.sold = sold_country.count
                   let index = copy_all_countries_data.findIndex(item => item.name == sold_country._id)
                   copy_all_countries_data.splice(index, 1, update_item);
                }


                copy_all_countries_data = copy_all_countries_data.map(item => {
                    return {name: item.name ?  item.name : "Unknown" ,  contacts: item.contacts, sold: item.sold }
               })

                this.setState({
                    country_chart_data: copy_all_countries_data
                })

            }else{
                 all_countries_data = all_countries_data.map(item => {
                    return {name: item.name ?  item.name : "Unknown" ,  contacts: item.contacts, sold: item.sold }
               })
                this.setState({
                    country_chart_data: all_countries_data
                })
            }

        }else{
            this.setState({
                country_chart_data: []
            })
         
        }
    }


    getStatusChartData =async ()=>{
        const {user_key} = this.props.login
        let res = await getCountGroupContacts(user_key , "status" )
        if(res.ok && res.result.length > 0){

            let contacts_status = res.result

            let status_chart_data = contacts_status.map(item => {
                    return {name: item._id ?  item._id : "Unknown" ,  value: item.count }
               })

               this.setState({
                   status_chart_data
               })
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

        this.setState({
            sold_percentage,

        })

        return true
    }


    getAllEvents = async ()=>{
        const {user_key} = this.props.login

        let events = await getAllTasks(user_key)
        let all_events = events.result

        if(events.ok && all_events.length > 0 ){

                let dates = all_events.map(e => {
                    return  moment(e.date).toDate()
                })
                
                this.setState({
                    events_date: dates,
                    events:all_events
                })  
        }

    }



    render() {
        const {events, events_date , contacts, sold_percentage, load , country_chart_data, status_chart_data} = this.state
        
        return (
            <div className="overview__container">

                <div className="overview__inner__container">

                <Fade delay={500} >
                <div className="overview__box overview__box__data__box">
                    <DataBox value={sold_percentage} data_text={"Closed Deals"} value_type={"%"}  />
                </div>
                </Fade>

                 <Fade delay={500} >
                <div className="overview__box"> 
                    <div className="overview__box__title">Contacts Status</div>
                    <PieChart chart_data={status_chart_data} />
                </div>
                </Fade>

                <Fade delay={500} >
                <div className="overview__box"> 
                    <div className="overview__box__title">Sales By Country</div>
                    <BarChartBox 
                        chart_data={country_chart_data} 
                        name={"name"} 
                        dataA={"contacts"} 
                        dataA_name={"All contacts"} 
                        dataB={"sold"} 
                        dataB_name={"Sold"} 
                    />
                </div>
                </Fade>

                <Fade delay={500} >
                <div className="overview__box overview__box__Calendar__box">
                <div className="overview__box__title">Tasks Tracker</div>

                    <Calendar dates={events_date} events={events} />
                </div>
                </Fade>

                </div>
            </div>

        );
    }
}



function mapStateToProps({ login }) {
    return { login };
  }
  
  export default withRouter(connect(mapStateToProps, actions)(Overview))