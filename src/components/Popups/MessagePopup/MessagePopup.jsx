import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import AddClientForm from '../../Forms/AddClientForm/AddClientForm';


class MessagePopup extends Component {
    render() {
        const { closePopUp, okBtn, message } = this.props
        return (
            <div className="main__popup__container message__popup">
                <div onClick={() => closePopUp()} className="overlay"></div>
                <Fade >
                    <div className="main__popup__inner__container">

                        <div>{message}</div>
                        <div>
                            <button className="btn">Ok</button>
                            <button className="btn">Cancle</button>
                        </div>

                    </div>
                </Fade>

            </div>
        );
    }
}

export default MessagePopup;