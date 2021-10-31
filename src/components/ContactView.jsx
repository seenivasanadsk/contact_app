import { connect } from "react-redux"
import ContactCard from "./ContactCard"
import ContactForm from "./ContactForm"
import ContactManage from "./ContactManage"
import './styles/ContactView.css'

function ContactView(props) {
    return (
        <div className='ContactView'>
            {
                props.contact ? <ContactCard contact={props.contact} />
                    : props.editContact ? <ContactForm type='Update' contact={props.editContact} />
                        : props.addContact ? <ContactForm type='Save' />
                            : (
                                <>
                                    <ContactManage class="d-md-none"/>                                   
                                    <div className="noView d-none d-md-flex">
                                        <div className="content">
                                            You have not selected any contact.
                                        </div>
                                    </div>
                                </>
                            )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    contact: state.ContactReducer.viewContact,
    addContact: state.ContactReducer.addContact,
    editContact: state.ContactReducer.editContact,
})

export default connect(mapStateToProps)(ContactView)