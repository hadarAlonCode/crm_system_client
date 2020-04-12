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
        
        const { openAddPopup, handleSearch } = this.props
        const {toggle_search} = this.state


        let contacts_page = window.location.pathname.includes("contacts")
        return (
            <div >


                {contacts_page ?  
                <div className="top__bar__nav">

                    <div className="top__bar__search__container">

                    <div onClick={()=>this.toggleSearch()} className="top__bar__search__icon">
                        <i class="fas fa-search"></i>
                    </div>

                    <div className="top__bar__search__input">
                         <input placeholder="Search By Name" className={toggle_search ? "top__bar__input--active" : "top__bar__input" } type="text" onChange={(e)=>handleSearch(e.target.value)}></input>
                    </div>

                    </div>


                 
                    <button onClick={() => openAddPopup(true)} className="add__btn"><i class="fas fa-plus-circle"></i></button>
                 </div>
                :

                null
            
               }
               
               
            </div>
        );
    }
}

export default TopBar;