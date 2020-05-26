import React, { Component } from 'react';

class TopBar extends Component {
    constructor(){
        super()
        this.state={
            toggle_search: false
        }
    }

    toggleSearch =()=>{
        const {toggle_search} = this.state
        this.setState({
            toggle_search: !toggle_search
        })

    }

    render() {
        
        const { openAddPopup, handleSearch, toggleTaskPopup } = this.props
        const {toggle_search} = this.state
        let contacts_page = window.location.pathname.includes("contacts")
        let tasks_page = window.location.pathname.includes("tasks")

        return (
            <div>

                {contacts_page ?  

                <div className="top__bar__nav">


                    <div className="top__bar__search__container">
                        <div onClick={()=>this.toggleSearch()} className="top__bar__search__icon">
                            <i className="fas fa-search"></i>
                        </div>
                        <div className="top__bar__search__input">
                            <input placeholder="Search By Name" className={toggle_search ? "top__bar__input--active" : "top__bar__input" } type="text" onChange={(e)=>handleSearch(e.target.value)}></input>
                        </div>
                    </div>
                    <button onClick={() => openAddPopup(true)} className="add__btn"><i class="fas fa-plus-circle"></i></button>
                 </div>
                :

                tasks_page ? 

                <div className="top__bar__nav top__bar__nav__task__page">  
                {/*  === need to continue */}

                      {/* <div className="top__bar__icon__container"> <i class="fas fa-calendar-day"></i></div>
                      <div className="top__bar__icon__container"> <i class="fas fa-calendar-alt"></i> </div>
                      <div className="top__bar__icon__container"><i class="fas fa-calendar-check"></i></div>
                     */}

                </div>

                :

                <div className="top__bar__nav">  
                   
                </div>
            
               }
               
               
            </div>
        );
    }
}

export default TopBar;