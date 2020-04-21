import React, { Component } from 'react'
import moment from "moment"
import 'moment/locale/he'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Fade from 'react-reveal/Fade';


class Calendar extends Component {
    constructor() {
        super()
        this.state = {
            show_event: true,
            events_data: [],

        }

    }



    handleChange = date => {
        const { events } = this.props
        let filter_event = events.filter(e => moment(e.date).isSame(date, 'day') )
        this.setState({
            events_data: filter_event
        })

    }




    render() {
        const {
            events, dates
        } = this.props
        const {show_event , events_data } = this.state

        return (
            <div className='options__datepicker calendar__conatiner'>
                <DatePicker
                    selected={ moment().toDate()}
                    onChange={this.handleChange}
                    inline
                    highlightDates={dates}
                />


                 {show_event && events_data.length > 0 ? 

                   <Fade>

                 <div className='events__container'> {events_data.map( event => {
                     return ( 
                     <div className="event__conatiner">
                        <div className="event__date"><span>Date: </span> { moment(event.date).format('L')}</div>
                        <div className="event__task"> <span>Task: </span>{ event.text}</div>
                        {event.contact_id ? <div className="event__contact"><span>Contact: </span>{ event.contact_id.name}</div> : null }
                      </div>)
                     
                 })}

                 </div></Fade> : ''}
                 


            </div>
        )
    }
}


export default Calendar

