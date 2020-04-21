import React, { Component } from 'react'
import moment from "moment"
// import he from 'date-fns/locale/he';
import 'moment/locale/he'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class DateSelect extends Component {
    constructor() {
        super()
        this.state = {

        }

    }



    handleChange = date => {
        const { state_name } = this.props
        this.props.updateForm(state_name, date)
        // this.setState({
        //     validation_error:false
        // })
    }


    // componentWillReceiveProps(nextProps) {
    //     const { validate_form, value } = this.props
    //     if (nextProps.validate_form !== validate_form) {
    //         if (!value) {
    //             this.setState({
    //                 validation_error: true
    //             })
    //         }
    //     }
    // }



    render() {
        const {
            size,
            month_value,
            day_value,
            year_value,
            element,
            validate_form,
            error,
            months,
            placeholder,
            value
        } = this.props
        const {validation_error} = this.state
        return (
            <div className='options__datepicker'>
                <label
                    id={value ? 'datepicker__label__active' : ''}
                    className='datepicker__label'>{placeholder}</label>
                <aside>

                    <i class="fas fa-calendar-alt"></i>
                    <h4>
                        {value ? moment(value).format('DD/MM/YY') : ''}
                    </h4>

                </aside>

                <DatePicker
                    selected={value ? value : moment().toDate()}
                    onChange={this.handleChange}
                    // locale={he}
                    // maxDate={moment().toDate()}
                    minDate={moment().toDate()}
                    showYearDropdown
                    yearDropdownItemNumber={45}
                    scrollableYearDropdown = {5}
                />
                 {/* {validation_error ? <p className='form__error__msg'>{error}</p> : ''} */}
            </div>
        )
    }
}


export default DateSelect

