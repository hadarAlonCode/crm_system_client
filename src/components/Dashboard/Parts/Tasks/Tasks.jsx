import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { getTasksPagination, updateTaskApi , deleteTaskApi } from '../../../../tools/functions/api/tasks_api';
import TopBar from '../../../TopBar/TopBar';
import Task from './Parts/Task';
import AddTaskBox from './Parts/AddTaskBox';


import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../../../../actions/actions';
import FormPopup from '../../../Popups/FormPopup/FormPopup';


class Tasks extends Component {
    constructor() {
        super()
        this.state = {
            limit: 5,
            page: 1,
            tasks: [],
            load_page: false,
            scroll_has_more: false,
           
            
        }
    }

    componentDidMount() {
       
        this.getTasksFirstTime()

    }

    getTasksFirstTime = async () => {
        const { limit, page } = this.state
        const {user_key} = this.props.login

        let tasks = await getTasksPagination(5, 1 , user_key)
        if (tasks.ok && tasks.result.length > 0) {
            this.setState({
                tasks: tasks.result,
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

    updateTasksList =()=>{
        this.getTasksFirstTime()
    }

    getTasks = async () => {
        const { limit, page, tasks } = this.state
        const {user_key} = this.props.login

        this.setState({
            scroll_has_more: false,
        }, async () => {

            let res = await getTasksPagination(limit, page, user_key)
            if (res.ok && res.result.length > 0) {

                let copy_tasks = JSON.parse(JSON.stringify(tasks))
                const new_tasks = copy_tasks.concat(res.result);
                this.setState({
                    tasks: new_tasks,
                })
                this.setState({
                    scroll_has_more: true,
                    page: page + 1
                })
            }
        })
    }



    updateTask = async(task_status , task)=>{

        let body ={
            status : task_status ? false : true
        }

        let task_id = task._id

        let update = await updateTaskApi(body, task_id)
    }


    deleteTask =  async (delete_task)=>{
       let task_res = await deleteTaskApi(delete_task._id)

       if(task_res.ok){
         
        const { tasks } = this.state
        let copy_tasks = JSON.parse(JSON.stringify(tasks))
        let index = copy_tasks.findIndex(task => task._id === delete_task._id)
        copy_tasks.splice(index, 1);

        this.setState({
            tasks: copy_tasks
        })

       }
    }


    toggleTaskPopup = (boolean) => {
        this.setState({
            toggle_task_popup: boolean
        })
    }






    render() {
        const { tasks, load_page, scroll_has_more, toggle_task_popup } = this.state
        const {user_key} = this.props.login


        return (
            load_page ?
            <div className="tasks__page__container"> 
                <TopBar toggleTaskPopup={this.toggleTaskPopup} />

                {/* <div className="tasks__page__add__box__container">
                   <AddTaskBox user_key={user_key} updateTasksList={this.updateTasksList} />
                </div> */}
                
                <div>
                  <InfiniteScroll
                            className="tasks__scroll__container"
                            pageStart={0}
                            loadMore={this.getTasks}
                            hasMore={scroll_has_more}
                            useWindow={false}
                        >
                            {tasks.map(task => {
                                return <Task key={task._id} task={task} updateTask={this.updateTask} deleteTask={this.deleteTask} />
                            })}
                        </InfiniteScroll>

                </div>

                {toggle_task_popup ?

                <FormPopup form={"AddTaskForm"} closePopUp={() => this.toggleTaskPopup(false)} user_key={user_key} updateTasksList={this.updateTasksList} />

                : null
                }

                
            </div>
            :
            null
        );
    }
}



function mapStateToProps({ login }) {
    return { login };
  }
  
  export default withRouter(connect(mapStateToProps, actions)(Tasks))