import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { getTasksPagination } from '../../../../tools/functions/api/tasks_api';
import TopBar from '../../../TopBar/TopBar';
import Task from './Parts/Task';
import AddTaskBox from './Parts/AddTaskBox';

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
        //demo
        // this.setState({
        //     contacts: demo_contacts
        // })
        this.getTasksFirstTime()

    }

    getTasksFirstTime = async () => {
        const { limit, page } = this.state

        let tasks = await getTasksPagination(5, 1)
        if (tasks.ok && tasks.result.length > 0) {
            this.setState({
                tasks: tasks.result,
                load_page: true,
                scroll_has_more: true,
                page: 2
            })
        }
    }

    getTasks = async () => {
        const { limit, page, tasks } = this.state
        console.log(tasks, "tasks")
        this.setState({
            scroll_has_more: false,
        }, async () => {

            let res = await getTasksPagination(limit, page)
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










    render() {
        console.log("Tasks")
        const { tasks, load_page, scroll_has_more } = this.state

        return (
            load_page ?
            <div className="tasks__page__container"> 
                <TopBar />

                <div className="tasks__page__add__box__container">
                   <AddTaskBox />
                </div>
                
                <div>
                  <InfiniteScroll
                            className="tasks__scroll__container"
                            pageStart={0}
                            loadMore={this.getTasks}
                            hasMore={scroll_has_more}
                            useWindow={false}
                        >
                            {tasks.map(task => {
                                return <Task task={task} />
                            })}
                        </InfiniteScroll>

                </div>

                
            </div>
            :
            null
        );
    }
}

export default Tasks;