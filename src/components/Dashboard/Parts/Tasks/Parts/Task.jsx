import React, { Component } from 'react';
import moment from "moment"

class Task extends Component {
    render() {
        const { task } = this.props

        return (
            <div className="task__container">

                <div className="task__left">
                    <div  className="task__status">{task.status ? <i class="fas fa-check-circle"></i> : <i class="far fa-circle"></i> }</div>
                    <div className="task__text">{task.text}</div>
                </div>

                <div className="task__center">
                    <div className="task__contact__icon">{task.contact_id.img ? 
                        <img src={task.contact_id.img} alt="Smiley face" height="42" width="42"></img>
                        : <i className="fas fa-user-circle"></i>} 
                    </div>
                    <div className="task__contact">{task.contact_id.name}</div>
                </div>

                <div className="task__right">

                    <div className="task__date">{task.date ? moment(task.date).format('L') : "-"}</div>
                    <div className="task__menu"><i class="fas fa-ellipsis-v"></i></div>


                </div>

                
            </div>
        );
    }
}

export default Task;