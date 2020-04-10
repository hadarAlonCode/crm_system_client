import React, { Component } from 'react';
import TextInput from '../../Inputs/TextInput';
import EmailInput from '../../Inputs/EmailInput';
import SelectBox from '../../Inputs/SelectBox';
import { country_list } from '../../../tools/functions/data/countries';
import { addContact } from '../../../tools/functions/api/contacts_api';
const status_options = ["Lead", "Contacted", "Sold", "Lost"]


class AddClientForm extends Component {
    constructor() {
        super()
        this.state = {
            form_data: {
                name: ""
            }

        }
    }


    updateForm = (state_name, value) => {

        console.log(state_name, value)

        const { form_data } = this.state
        let copy_form_data = JSON.parse(JSON.stringify(form_data))
        copy_form_data[state_name] = value

        console.log(copy_form_data)
        this.setState({
            form_data: copy_form_data
        })
    }


    validationForm = () => {
        // if validation class is on - valitadion wrong

        // check all the outfot types 

    }


    submitForm = async () => {

        //validate

        //update api
        const { closePopUp } = this.props
        const { form_data } = this.state
        console.log(form_data)


        let body = {
            name: form_data.name ? form_data.name : undefined,
            email: form_data.email ? form_data.email : undefined,
            phone: form_data.phone ? form_data.phone : undefined,
            firstContact: new Date(),
            country: form_data.country ? form_data.country : undefined,
            status: form_data.status ? form_data.status : undefined,
            company: form_data.company ? form_data.company : undefined,
            position: form_data.position ? form_data.position : undefined,
        }

        let new_contact = await addContact(body)
        console.log(new_contact)

        if (new_contact.ok) {
            closePopUp()
        }

    }


    render() {
        console.log(this.state)
        const { form_data } = this.state
        return (
            <div className="add__client__form__container">
                <h2>Add New Contact</h2>
                <div className="form__inputs__container">
                    <TextInput
                        state_name={"name"}
                        state_value={form_data["name"]}
                        err_text={"Please enter name"}
                        title_text={"Full Name"}
                        updateForm={this.updateForm}
                    />
                    <TextInput
                        state_name={"email"}
                        state_value={form_data["email"]}
                        err_text={"Please enter a valid email"}
                        title_text={"Email"}
                        updateForm={this.updateForm}
                    />
                    <TextInput
                        state_name={"phone"}
                        state_value={form_data["phone"]}
                        err_text={"Please enter a valid phone number"}
                        title_text={"Phone"}
                        updateForm={this.updateForm}
                    />

                    <SelectBox
                        options={country_list}
                        state_value={form_data["country"]}
                        state_name={"country"}
                        title_text={"Country"}
                        updateForm={this.updateForm}
                    />

                    <SelectBox
                        options={status_options}
                        state_value={form_data["status"]}
                        state_name={"status"}
                        title_text={"Status"}
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

                </div>

                <button onClick={() => this.submitForm()}>ADD CONTACT</button>


            </div>
        );
    }
}

export default AddClientForm;