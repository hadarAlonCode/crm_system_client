import React, { Component } from 'react';
import demo_contacts from '../../../../tools/demo/demo_contacts';
import Contact from './Parts/Contact';
import { getContactsPagination } from '../../../../tools/functions/api/contacts_api';
import InfiniteScroll from 'react-infinite-scroller';
import ContactNavBar from './Parts/ContactNavBar';
import FormPopup from '../../../Popups/FormPopup/FormPopup'



class Contacts extends Component {

    constructor() {
        super()
        this.state = {
            limit: 5,
            page: 1,
            contacts: [],
            load_page: false,
            scroll_has_more: false,
            toggle_add_popup: false
        }
    }

    componentDidMount() {
        //demo
        // this.setState({
        //     contacts: demo_contacts
        // })
        this.getContactsFirstTime()

    }

    getContactsFirstTime = async () => {
        const { limit, page } = this.state

        let contacts = await getContactsPagination(5, 1)
        if (contacts.ok && contacts.result.length > 0) {
            this.setState({
                contacts: contacts.result,
                load_page: true,
                scroll_has_more: true,
                page: 2
            })
        }
    }


    getContacts = async () => {
        const { limit, page, contacts } = this.state
        console.log(contacts, "contacts")
        this.setState({
            scroll_has_more: false,
        }, async () => {

            let res = await getContactsPagination(limit, page)
            if (res.ok && res.result.length > 0) {

                let copy_contacts = JSON.parse(JSON.stringify(contacts))
                const new_contacts = copy_contacts.concat(res.result);
                this.setState({
                    contacts: new_contacts,
                })
                this.setState({
                    scroll_has_more: true,
                    page: page + 1
                })
            }
        })
    }

    toggle_add_popup = (boolean) => {
        this.setState({
            toggle_add_popup: boolean
        })
    }


    render() {
        const { contacts, load_page, scroll_has_more, toggle_add_popup } = this.state
        return (
            load_page ?
                <div>
                    <ContactNavBar openAddPopup={this.toggle_add_popup} />

                    <div className="contacts__container">
                        <InfiniteScroll
                            className="contacts__scroll__container"
                            pageStart={0}
                            loadMore={this.getContacts}
                            hasMore={scroll_has_more}
                            useWindow={false}
                        >
                            {contacts.map(contact => {
                                return <Contact contact={contact} />
                            })}
                        </InfiniteScroll>

                    </div>

                    {toggle_add_popup ?

                        <FormPopup form={"AddClientForm"} closePopUp={() => this.toggle_add_popup(false)} />

                        : null

                    }


                </div>
                : null
        );
    }
}

export default Contacts;