
import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

let moment = require('moment');

class Contact extends Component {
    render() {
        const { contact } = this.props
        return (
            <Fade >

                <div className="contact__container">
                    <div className="conatct_text">
                        <div className="icon__container">{contact.img ? <img src={contact.img} alt="Smiley face" height="42" width="42"></img> : <i class="fas fa-user-circle"></i>} </div>
                        <div className="name__container">{contact.name ? contact.name : "-"}</div>
                    </div>

                    <div className="conatct_text">{contact.email ? contact.email : "-"}</div>
                    <div className="conatct_text conatct_company">{contact.company ? contact.company : "-"}</div>
                    <div className="conatct_text">{contact.status ? contact.status : "-"}</div>
                    {/* <div>{contact.firstContact ? moment(contact.firstContact).format('L') : "-"}</div> */}
                </div>
            </Fade>
        );
    }
}

export default Contact;