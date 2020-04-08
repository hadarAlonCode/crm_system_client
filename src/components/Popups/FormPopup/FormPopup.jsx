import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import AddClientForm from '../../Forms/AddClientForm/AddClientForm';

//Popup container for Forms & Alerst


class FormPopup extends Component {
    render() {
        const { closePopUp, form } = this.props
        return (
            <div className="add__contact__popup__container">
                <div onClick={() => closePopUp()} className="overlay"></div>
                <Fade top >
                    <div className="add__contact__popup__inner__container">

                        {form === "AddClientForm" ?
                            <AddClientForm />
                            : null
                        }

                    </div>
                </Fade>

            </div>
        );
    }
}

export default FormPopup;