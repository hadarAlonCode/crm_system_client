import React, { Component } from 'react';
import validator from 'validator';

class TextInput extends Component {

    constructor() {
        super()
        this.state = {
            value: "",
            is_validate: true
        }
    }


    componentDidMount() {
        const { state_name, state_value } = this.props

        if (state_value) {
            this.setState({
                vlaue: state_value
            })
        }
    }


    componentDidUpdate(prevProps) {

        if (prevProps.check_validation !== this.props.check_validation) {
            if (this.props.check_validation) {
                this.validation()
            }
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


    handleBlur = () => {

        const { state_name, state_value, updateForm } = this.props
        const { value } = this.state
        let validation_result = this.validation()
        if (validation_result) {
            updateForm(state_name, value)
        }

    }

    handleFocus = () => {
        this.setState({
            is_validate: true
        })
    }



    render() {
        const { state_name, state_value, err_text, title_text } = this.props
        const { value, is_validate } = this.state

        return (
            <div className="input__container">
                {title_text ? <h3>{title_text}</h3> : null}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => this.handleChange(e)}
                    onBlur={() => this.handleBlur()}
                    onFocus={() => this.handleFocus()}
                ></input>

                {is_validate ?
                    null :
                    <div className="validation_error">{err_text}</div>
                }
            </div>
        );
    }
}

export default TextInput;