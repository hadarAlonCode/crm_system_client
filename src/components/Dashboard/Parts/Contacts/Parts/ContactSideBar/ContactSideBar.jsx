import React, {Component} from 'react';
import EditContactInput from './Parts/EditContactInput';
import moment from "moment"

class ContactSideBar extends Component {
    render() {

        const {toggle_side_bar, contact, editContactdata, toggleSideBar} = this.props
        console.log(contact)

        return (
            <div className={toggle_side_bar ? "contact__side__bar__container" : "contact__side__bar__container contact__side__bar__container--off"}>
                <div onClick={()=>toggleSideBar()} className="exit__side__bar"><i class="fas fa-chevron-right"></i></div>
           
                <div className="contact__side__bar__title__container">
                    <div className="icon__container">{contact.img ? <img src={contact.img} alt="Smiley face" height="42" width="42"></img> : <i className="fas fa-user-circle"></i>} </div>
                    <h2>Contact Info</h2>
                </div>
                <div className="contact__info__container">


                    <section>

                        <EditContactInput  editContactdata={editContactdata}  err_text="Please enter name" state_name="name" title_text="Name" state_value={contact.name} />

                    </section>


                    <section>

                        <EditContactInput editContactdata={editContactdata} err_text="Please enter a valid email" state_name="email" title_text="Email" state_value={contact.email ? contact.email : "-"} />

                    </section>


                    <section>

                        <EditContactInput editContactdata={editContactdata} err_text="Please enter a valid phone number" state_name="phone" title_text="Phone" state_value={contact.phone ? contact.phone : "-"} />

                    </section>


                    <section>

                        <EditContactInput editContactdata={editContactdata} state_name="country" title_text="Country" state_value={contact.country ? contact.country : "-"} />

                    </section>


                    <section>

                        <EditContactInput  editContactdata={editContactdata} err_text="Please enter company name" state_name="company" title_text="Company" state_value={contact.company ? contact.company : "-"} />


                    </section>

                    <section>

                        <EditContactInput err_text={"Please enter position"} state_name="position" title_text="Position" state_value={contact.position ? contact.position : "-"} />

                    </section>



                    <section>

                    <EditContactInput editContactdata={editContactdata} state_name="status" title_text="Status" state_value={contact.status ? contact.status : "-"} />

                    </section>



                    <section>
                        <h3 className="edit__title">First Contacted</h3>
                        <p>{contact.firstContact ? moment(contact.firstContact).format('L') : "-"}</p>
                    </section>


                </div>
            </div>
        );
    }
}

export default ContactSideBar;