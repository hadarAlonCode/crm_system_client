import React, { Component } from 'react';
import TextInput from '../../Inputs/TextInput';
import EmailInput from '../../Inputs/EmailInput';
import SelectBox from '../../Inputs/SelectBox';
import { country_list } from '../../../tools/functions/data/countries';

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


    submitForm = () => {

        //validate

        //update api

    }


    render() {
        console.log(this.state)
        const { form_data } = this.state
        return (
            <div>
                <h2>Add New Contact</h2>
                <TextInput
                    state_name={"name"}
                    state_value={form_data["name"]}
                    err_text={"Please enter name"}
                    title_text={"Contact Name"}
                    updateForm={this.updateForm}
                />
                <TextInput
                    state_name={"email"}
                    state_value={form_data["email"]}
                    err_text={"Please enter a valid email"}
                    title_text={"Contact Email"}
                    updateForm={this.updateForm}
                />
                <TextInput
                    state_name={"phone"}
                    state_value={form_data["phone"]}
                    err_text={"Please enter a valid phone number"}
                    title_text={"Contact Phone"}
                    updateForm={this.updateForm}
                />

                {/* /// add update form  */}

                <SelectBox
                    options={country_list}
                    state_value={form_data["country"]}
                    state_name={"country"}
                    updateForm={this.updateForm}
                />

                {/* //need to add mor input and  */}

                <SelectBox
                    options={country_list}
                    state_value={form_data["country"]}
                    state_name={"country"}
                    updateForm={this.updateForm}
                />



            </div>
        );
    }
}

export default AddClientForm;