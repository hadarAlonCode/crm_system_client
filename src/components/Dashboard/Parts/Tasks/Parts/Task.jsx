import React, { Component } from 'react';
import moment from "moment"

class Task extends Component {

    constructor(){
       super()
       this.state ={
           task_status: false
       }
    }

    componentDidMount(){
        const { task , updateTask } = this.props

        this.setState({
            task_status: task.status
        })

    }


    updateStatus =()=>{
        const {task_status} = this.state
        const { task , updateTask } = this.props

        this.setState({
            task_status: !task_status
        })

        updateTask(task_status , task)

    }



    render() {
        const { task , deleteTask } = this.props
        const {task_status} = this.state

        return (
            <div className="task__container">

                <div className="task__left">
                    <div onClick={()=>this.updateStatus()} className="task__status">{task_status ? <i class="fas fa-check-circle"></i> : <i class="far fa-circle"></i> }</div>
                    <div className="task__text">{task.text}</div>
                </div>

                <div className="task__center">

                    {task.contact_id ? 

                    <div className="task__contact__icon">{task.contact_id.img ? 
                        <img src={task.contact_id.img} alt="Smiley face" height="42" width="42"></img>
                        : <i className="fas fa-user-circle"></i>} 
                    </div>

                    : null
                
                }

                <div className="task__contact">{task.contact_id ? task.contact_id.name : "-"}</div>
                    
                </div>

                <div className="task__right">

                    <div className="task__date">{task.date ? moment(task.date).format('L') : "-"}</div>
                    <div className="task__menu" onClick={()=>deleteTask(task)}><i class="fas fa-trash"></i></div>


                </div>

                
            </div>
        );
    }
}

export default Task;