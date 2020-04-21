import React, { Component } from 'react';
import TextInput from '../../Inputs/TextInput';
import EmailInput from '../../Inputs/EmailInput';
import SelectBox from '../../Inputs/SelectBox';
import countries_options  from '../../../tools/functions/data/countries_options';
import { addContact } from '../../../tools/functions/api/contacts_api';
import MessagePopup from '../../Popups/MessagePopup/MessagePopup';
import status_options from '../../../tools/functions/data/status_options';
import { connect } from "react-redux";
import * as actions from '../../../actions/actions';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";


class AddClientForm extends Component {
    constructor() {
        super()
        this.state = {
            form_data: {
                name: "",

            },
            check_validation: false

        }
    }


    updateForm = (state_name, value) => {


        const { form_data } = this.state
        let copy_form_data = JSON.parse(JSON.stringify(form_data))
        copy_form_data[state_name] = value

        this.setState({
            form_data: copy_form_data
        })
    }


    validationForm = () => {
        // if validation class is on - valitadion wrong

        // check all the outfot types 

        this.setState({
            check_validation: true
        })

        setTimeout(() => {
            this.setState({
                check_validation: false
            })
        }, 500);




    }


    submitForm = async () => {

        //validate

        //update api
        const { closePopUp } = this.props
        const { form_data } = this.state
        const { user_key } = this.props.login


        this.validationForm()

        setTimeout(async () => {
            let err_class = document.querySelectorAll(".validation_error");

            if (err_class.length > 0) {
                return
            } else {

                let body = {
                    name: form_data.name ? form_data.name : undefined,
                    email: form_data.email ? form_data.email : undefined,
                    phone: form_data.phone ? form_data.phone : undefined,
                    firstContact: new Date(),
                    country: form_data.country ? form_data.country : undefined,
                    status: form_data.status ? form_data.status : undefined,
                    company: form_data.company ? form_data.company : undefined,
                    position: form_data.position ? form_data.position : undefined,
                    user_key
                }

                let new_contact = await addContact(body)

                if (new_contact.ok) {
                    this.props.setNewContact(new_contact.result)
                    closePopUp()
                }

            }

        }, 500);

    }


    render() {
        const { closePopUp } = this.props
        const { form_data, check_validation } = this.state
        return (
            <div className="add__client__form__container">
                <i onClick={() => closePopUp()} className="fas fa-times exit__icon"></i>
                <h2 className="form__title">Add New Contact</h2>
                <div className="form__inputs__container">
                    <TextInput
                        state_name={"name"}
                        state_value={form_data["name"]}
                        err_text={"Please enter name"}
                        title_text={"Full Name"}
                        updateForm={this.updateForm}
                        check_validation={check_validation}
                    //required 
                    />
                    <TextInput
                        state_name={"email"}
                        state_value={form_data["email"]}
                        err_text={"Please enter a valid email"}
                        title_text={"Email"}
                        updateForm={this.updateForm}
                        check_validation={check_validation}
                    //required 
                    />
                    <TextInput
                        state_name={"phone"}
                        state_value={form_data["phone"]}
                        err_text={"Please enter a valid phone number"}
                        title_text={"Phone"}
                        updateForm={this.updateForm}
                    />

                    <SelectBox
                        options={countries_options}
                        state_value={form_data["country"]}
                        state_name={"country"}
                        title_text={"Country"}
                        updateForm={this.updateForm}
                    />
                    <TextInput
                        state_name={"company"}
                        state_value={form_data["company"]}
                        err_text={"Please enter company name"}
                        title_text={"Company"}
                        updateForm={this.updateForm}
                    />
                    <TextInput
                        state_name={"position"}
                        state_value={form_data["position"]}
                        err_text={"Please enter position"}
                        title_text={"Position"}
                        updateForm={this.updateForm}
                    />
                    <SelectBox
                        options={status_options}
                        state_value={form_data["status"]}
                        state_name={"status"}
                        title_text={"Status"}
                        updateForm={this.updateForm}
                    />

                </div>

                <div className="btn__container"> <button className="btn" onClick={() => this.submitForm()}>ADD CONTACT</button></div>


            </div>


        );
    }
}



function mapStateToProps({ login }) {
    return { login };
  }
  
  export default withRouter(connect(mapStateToProps, actions)(AddClientForm))