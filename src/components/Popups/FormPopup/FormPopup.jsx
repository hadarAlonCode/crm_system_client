import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import AddClientForm from '../../Forms/AddClientForm/AddClientForm';
import AddTaskBox from '../../Dashboard/Parts/Tasks/Parts/AddTaskBox';

//Popup container for Forms & Alerst


class FormPopup extends Component {
    render() {
        const { closePopUp, form } = this.props
        return (
            <div className="main__popup__container">
                <div onClick={() => closePopUp()} className="overlay"></div>
                <Fade top >
                    <div className="main__popup__inner__container">

                        {form === "AddClientForm" ?
                            <AddClientForm closePopUp={closePopUp} />
                            : null
                        }

                    </div>
                </Fade>

            </div>
        );
    }
}

export default FormPopup;