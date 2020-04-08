import React, { Component } from 'react';

class ContactNavBar extends Component {
    render() {
        const { openAddPopup } = this.props
        return (
            <div className="contacts__nav">
                <div><input></input></div>
                <button onClick={() => openAddPopup(true)} className="add__btn"><i class="fas fa-plus-circle"></i></button>

            </div>
        );
    }
}

export default ContactNavBar;