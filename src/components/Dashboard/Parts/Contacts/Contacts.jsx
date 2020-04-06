import React, { Component } from 'react';
import demo_contacts from '../../../../tools/demo/demo_contacts';
import Contact from './Parts/Contact';



class Contacts extends Component {

    constructor() {
        super()
        this.state = {
            contacts: [

            ]
        }
    }

    componentDidMount() {
        this.setState({
            contacts: demo_contacts
        })
    }


    render() {
        const { contacts } = this.state
        console.log(contacts)
        return (
            <div>
                <div>NAV</div>
                <div className="contacts__container">
                    {contacts.map(contact => {
                        return <Contact contact={contact} />
                    })}
                </div>
            </div>
        );
    }
}

export default Contacts;