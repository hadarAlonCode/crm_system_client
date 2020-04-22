import React, { Component } from 'react';
import { getAllContacts } from '../../../../../tools/functions/api/contacts_api';
import SelectBox from '../../../../Inputs/SelectBox';
import DateSelect from '../../../../DateSelect/DateSelect';
import { addNewTaskApi } from '../../../../../tools/functions/api/tasks_api';
import Fade from 'react-reveal/Fade';

class AddTaskBox extends Component {

    constructor(){
        super()
        this.state={
          contacts_options : [],
          select_contact: "",
          task_date: "",
          validate_task: true,
          task_text:""
        }
    }

    async componentDidMount(){
        const {user_key} = this.props
        

         let res = await getAllContacts(user_key)
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
            task_text: text,
            validate_task: true
        })

    }

    updateForm =(name, value)=>{

        this.setState({
             [name]: value
        })

    }



    submitTask = async ()=>{
        const  {task_date , select_contact ,task_text} = this.state
        const {updateTasksList} = this.props
        const {user_key} = this.props


        if( task_text.trim() !== "" ) {
            let body = {
              status: false,
              date: task_date ?task_date : undefined,
              contact_id: select_contact? select_contact._id : undefined,
              text: task_text,
              user_key
            }

                let new_task = await addNewTaskApi(body)
                if(new_task.ok){
                    this.setState({
                        select_contact: "",
                        task_date: "",
                        task_text:""
                    })
                    
                    updateTasksList()

                }else{
                    alert(new_task.result)
                }
        }else{
             this.setState({
                validate_task: false
             })
        }


   
    }


    render() {
        const {contacts_options, load, select_contact ,task_date, validate_task ,task_text} = this.state

        
        return (

            load ?
           
            <div className="add__task__box__container">

            <div className="add__task__box__left">
                <div onClick={()=>this.submitTask()} className="add__task__box__icon"><i className="fas fa-plus"></i></div>
                <div className="add__task__box__input"><input onChange={(e)=>this.handleTextInput(e)} type="text" placeholder="Add New Task..." value={task_text}></input></div>
            </div>

            <div className="add__task__box__center">
                <div className="add__task__box__contact__icon">
                    <i className="fas fa-user-plus"></i>
                </div>
                <div className="add__task__box__contact__input">
                    <SelectBox  updateForm={this.selectContact}  state_value={select_contact.name} state_name="contact" placeholder="Add Contact..." options={contacts_options} />
                </div>
            </div>

            <div className="add__task__box__right">
                <div><DateSelect updateForm={this.updateForm} state_name={"task_date"} value={task_date} /></div>
            </div>

            {validate_task ? null : <div className="task_err">Please Enter a task</div>}

          </div>
       

          : null
        );
    }
}

export default AddTaskBox;