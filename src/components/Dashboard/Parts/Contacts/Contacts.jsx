import React, { Component } from 'react';
import Contact from './Parts/Contact';
import { getContactsPagination, updateContact, searchByName , addContact } from '../../../../tools/functions/api/contacts_api';
import InfiniteScroll from 'react-infinite-scroller';
import FormPopup from '../../../Popups/FormPopup/FormPopup'
import ContactSideBar from './Parts/ContactSideBar/ContactSideBar';
import TopBar from '../../../TopBar/TopBar';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from '../../../../actions/actions';


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


   async componentDidMount() {
        this.getContactsFirstTime()
    }

    componentDidUpdate(prevProps){
        const {new_contact} = this.props.contact_reducer
        if(prevProps.contact_reducer.new_contact !== new_contact ){
            this.getContactsFirstTime()
        }
    }
    

    getContactsFirstTime = async () => {
        const { limit, page } = this.state
        const {user_key} = this.props.login

        let contacts = await getContactsPagination(5, 1, user_key)
        if (contacts.ok && contacts.result.length > 0) {
            this.setState({
                contacts: contacts.result,
                load_page: true,
                scroll_has_more: true,
                page: 2
            })
        }else{
            this.setState({
                load_page: true,
                scroll_has_more: true,

            })
        }
    }


    getContacts = async () => {
        const { limit, page, contacts } = this.state
        const { user_key } = this.props.login

        this.setState({
            scroll_has_more: false,
        }, async () => {

            let res = await getContactsPagination(limit, page , user_key  )
            if (res.ok && res.result.length > 0) {

                let copy_contacts = JSON.parse(JSON.stringify(contacts))
                let new_contacts = copy_contacts.concat(res.result);
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

        if(contact._id === selected_contact._id || !toggle_side_bar ){
            this.toggleSideBar()
        }

    }


    editContactData = async (state_name, val) => {
        const {selected_contact} = this.state

        let value = val

        if(state_name === "status"){
            value = val.toLowerCase();
        }

        let body ={
            [state_name]: value,
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


    deleteContactsAfterUpdate =(id)=>{

        const {  contacts } = this.state
        let copy_contacts = JSON.parse(JSON.stringify(contacts))
        let index = copy_contacts.findIndex(contact => contact._id === id)
        copy_contacts.splice(index, 1);

        this.setState({
            contacts: copy_contacts
        })
    }


    
    handleSearch = async (keyword) => {
        const {user_key} = this.props.login

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
                let res = await searchByName(keyword ,user_key)
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
                            {contacts.length > 0  ?
                                contacts.map(contact => {
                                    return <Contact key={contact._id} contact={contact} selectedContact={this.selectedContact} />
                                })
                            :
                               <div className="no__contacts">Please Add New Contact</div>
                        }      
                        </InfiniteScroll>
                    
                    </div>

                    {toggle_add_popup ?

                        <FormPopup form={"AddClientForm"} closePopUp={() => this.toggleAddPopup(false)} />

                        : null
                    }

                    <ContactSideBar deleteContactsAfterUpdate={this.deleteContactsAfterUpdate} toggleSideBar={this.toggleSideBar} editContactdata={this.editContactData} toggle_side_bar={toggle_side_bar} contact={selected_contact} />
                </div>
                : null
        );
    }
}



function mapStateToProps({ login , contact_reducer}) {
    return { login, contact_reducer };
  }
  
  export default withRouter(connect(mapStateToProps, actions)(Contacts))