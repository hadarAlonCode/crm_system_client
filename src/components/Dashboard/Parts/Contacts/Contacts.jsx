import React, { Component } from 'react';
import Contact from './Parts/Contact';
import { getContactsPagination, updateContact, searchByName } from '../../../../tools/functions/api/contacts_api';
import InfiniteScroll from 'react-infinite-scroller';
import FormPopup from '../../../Popups/FormPopup/FormPopup'
import ContactSideBar from './Parts/ContactSideBar/ContactSideBar';
import TopBar from '../../../TopBar/TopBar';



class Contacts extends Component {

    constructor() {
        super()
        this.state = {
            limit: 5,
            page: 1,
            contacts: [],
            load_page: false,
            scroll_has_more: false,
            toggle_add_popup: false,
            selected_contact: {}
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

    toggleAddPopup = (boolean) => {
        this.setState({
            toggle_add_popup: boolean
        })
    }

  

    toggleSideBar = () => {
        const { toggle_side_bar } = this.state
        this.setState({
            toggle_side_bar: !toggle_side_bar
        })

        let contacts__scroll__container = document.getElementsByClassName("contacts__scroll__container");

        if (!toggle_side_bar) {
            contacts__scroll__container[0].style.width = 'calc(100% - 305px)';
        } else {
            contacts__scroll__container[0].style.width = '100%';

        }
    }

    selectedContact = (contact) => {
        const {selected_contact , toggle_side_bar} = this.state
        this.setState({
            selected_contact: contact
        })

        if(contact._id === selected_contact._id ){
            this.toggleSideBar()
        }

        if(!toggle_side_bar){
            this.toggleSideBar()
        }

      

    }


    editContactData = async (state_name, val) => {
        const {selected_contact} = this.state

        let body ={
            [state_name]: val,
        }

        let update = await updateContact(body ,  selected_contact._id)
        if(update.ok){
            this.setState({
                selected_contact: update.result
            }) 

            this.editContactsAfterUpdate(update.result)

            return update
        }

    }


    editContactsAfterUpdate =(update_contact)=>{

        const {  contacts } = this.state
        let copy_contacts = JSON.parse(JSON.stringify(contacts))
        let index = copy_contacts.findIndex(contact => contact._id === update_contact._id)
        copy_contacts.splice(index, 1, update_contact);

        this.setState({
            contacts: copy_contacts
        })

    }


    handleSearch = async (keyword) => {

        this.setState({
            filter_name: keyword
        })

        window.clearTimeout(this.state.timeout)
        if (!keyword) {

            //search all
            this.setState({
                contacts: [],
            },()=>{
                this.getContactsFirstTime()
            })

        } else {
            const timeout = setTimeout(async () => {
                let res = await searchByName(keyword)
                if (res.ok) {
                    this.setState({
                        contacts: res.result,
                        scroll_has_more: false
                    })
                }
            }, 300);
            this.setState({
                timeout
            })

        }
    }



    render() {
        const { contacts, load_page, scroll_has_more, toggle_add_popup, toggle_side_bar, selected_contact } = this.state
        return (
            load_page ?
                <div className="contacts__page__container">
                    <TopBar handleSearch={this.handleSearch} openAddPopup={this.toggleAddPopup} />
                    <div className="contacts__container">
                        <InfiniteScroll
                            className="contacts__scroll__container"
                            pageStart={0}
                            loadMore={this.getContacts}
                            hasMore={scroll_has_more}
                            useWindow={false}
                        >
                            {contacts.map(contact => {
                                return <Contact contact={contact} selectedContact={this.selectedContact} />
                            })}
                        </InfiniteScroll>
                    

                    </div>

                    {toggle_add_popup ?

                        <FormPopup form={"AddClientForm"} closePopUp={() => this.toggleAddPopup(false)} />

                        : null
                    }

                    <ContactSideBar toggleSideBar={this.toggleSideBar} editContactdata={this.editContactData} toggle_side_bar={toggle_side_bar} contact={selected_contact} />
                </div>
                : null
        );
    }
}

export default Contacts;