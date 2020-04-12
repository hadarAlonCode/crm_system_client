import React, { Component } from 'react';
import validator from 'validator';

class EditContactInput extends Component {

    constructor() {
        super()
        this.state = {
            value: "",
            is_validate: true,
            edit_mode: false
        }
    }


    componentDidMount() {
        const { state_name, state_value } = this.props

        if (state_value) {
            this.setState({
                value: state_value
            })
        }
    }


    componentDidUpdate(prevProps) {
        const { state_value } = this.props

        if (prevProps.state_value != state_value) {

            this.setState({
                value: state_value
            })

        }

    }


    handleChange = (e) => {
        let value = e.target.value
        this.setState({
            value
        })
    }


    validation = () => {
        const { value } = this.state
        const { state_name } = this.props

        console.log(state_name)

        if (state_name === "email") {


            if (!validator.isEmail(value)) {
                this.setState({
                    is_validate: false
                })

                return false

            } else {
                this.setState({
                    is_validate: true
                })

                return true
            }


        } else if (state_name === "phone") {


            if (!validator.isNumeric(value) && value !== '') {
                this.setState({
                    is_validate: false
                })

                return false

            } else {
                this.setState({
                    is_validate: true
                })

                return true
            }




        } else if (state_name === "name") {

            if (value === '') {
                this.setState({
                    is_validate: false
                })

                return false

            } else {
                this.setState({
                    is_validate: true
                })

                return true
            }

        } else {

            this.setState({
                is_validate: true
            })
            return true
        }



    }


    handleSubmit = () => {

        const { state_name, state_value, editContactdata } = this.props
        const { value } = this.state
        let validation_result = this.validation()
        if (validation_result) {
            
          let update_res = editContactdata(state_name, value)
          if(update_res.ok){
              
            this.setState({
                edit_mode: false
            }) 
          }
 
        }

        //close edit mode

    }

    handleFocus = () => {
        this.setState({
            is_validate: true
        })
    }

    toggleEditMode = () => {
        const { edit_mode } = this.state

        this.setState({
            edit_mode: !edit_mode
        })
    }



    render() {
        const { state_name, state_value, err_text, title_text } = this.props
        const { value, is_validate, edit_mode } = this.state

        return (
            <div className="input__container">
                {title_text ? <h3>{title_text}</h3> : null}


                {edit_mode ?

                    <div>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => this.handleChange(e)}
                            onFocus={() => this.handleFocus()}
                        ></input>

                        {is_validate ?
                            null :
                            <div className="validation_error">{err_text}</div>
                        }

                        <div>
                            <button onClick={() => this.handleSubmit()}>Ok</button>
                            <button onClick={() => this.toggleEditMode()}>Cancle</button>
                        </div>
                    </div>

                    :

                    <div>

                        <input
                            type="text"
                            value={value}
                            onChange={(e) => this.handleChange(e)}
                            onFocus={() => this.handleFocus()}
                            disabled
                        ></input>

                        <button onClick={() => this.toggleEditMode()}>EDIT</button>

                    </div>
                }



            </div>
        );
    }
}

export default EditContactInput;