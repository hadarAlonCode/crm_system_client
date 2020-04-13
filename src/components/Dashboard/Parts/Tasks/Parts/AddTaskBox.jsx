import React, { Component } from 'react';
import { getAllContacts } from '../../../../../tools/functions/api/contacts_api';
import SelectBox from '../../../../Inputs/SelectBox';
import DateSelect from '../../../../DateSelect/DateSelect';

class AddTaskBox extends Component {

    constructor(){
        super()
        this.state={
          contacts_options : [],
          select_contact: ""
        }
    }

    async componentDidMount(){
         let res = await getAllContacts()
         if(res.ok)
         this.setState({
            contacts_options: res.result,
            load: true
         })
    }


    selectContact =(name, contact)=>{
       this.setState({
        select_contact: contact
       })
    }

    handleTextInput =(e)=>{
        let text = e.target.value

        this.setState({
            task_text: text
        })

    }


    submitTask =()=>{
        console.log(this.state)
    }


    render() {
        const {contacts_options, load, select_contact} = this.state

        
        return (

            load ?
            
            <div className="add__task__box__container">

            <div className="add__task__box__left">
                <div onClick={()=>this.submitTask()} className="add__task__box__icon"><i class="fas fa-plus"></i></div>
                <div className="add__task__box__input"><input onChange={(e)=>this.handleTextInput(e)} type="text" placeholder="Add New Task..."></input></div>
            </div>

            <div className="add__task__box__center">
                <div className="add__task__box__contact__icon">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div className="add__task__box__contact__input">
                    {/* <input type="text" placeholder="Add Contact..."></input> */}
                    <SelectBox updateForm={this.selectContact}  state_value={select_contact.name} state_name="contact" placeholder="Add Contact..." options={contacts_options} />
                </div>
            </div>

            <div className="add__task__box__right">
                <div><DateSelect /></div>
            </div>

          </div>

          : null
        );
    }
}

export default AddTaskBox;