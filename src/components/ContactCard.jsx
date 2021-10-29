import { connect } from 'react-redux'
import { CONTACT_CANCEL, EDIT_CONTACT } from '../types'
import './styles/ContactCard.css'

function ContactCard(props) {
    let contact = props.contact ? props.contact : []
    return (
        <div className='ContactCard'>
            <i className="fas fa-arrow-left goback" onClick={props.cancelBtn}></i>
            <img src={contact.imageUrl ? contact.imageUrl : "/profile0.png"} alt="" />
            <div className="name">
                <div className="label">Name:</div>
                {contact.name}
                <div className="icon">
                    <i getid={contact.id} onClick={props.editContact} style={{ color: "blue", borderColor: 'blue' }} className="fas fa-edit"></i>
                </div>
            </div>
            <div className="phone">
                <div className="label">Phone Number:</div>
                {contact.phone}
                <div className="icon">
                    <a href={`tel:${contact.phone}`}><i className="fas fa-phone" style={{ color: "green", borderColor: 'green' }}></i></a>
                    <i href={`sms:${contact.phone}`} className="fas fa-comment-lines" style={{ color: "orange", borderColor: 'orange' }}></i>
                </div>
            </div>
            {
                contact.email && (
                    <div className="email">
                        <div className="label">Email:</div>
                        {contact.email}
                        <div className="icon">
                            <a href={`mailto:${contact.email}`}><i className="fas fa-envelope" style={{ color: "orangered", borderColor: 'orangered' }}></i></a>
                        </div>
                    </div>
                )
            }
            <div className="whatsapp">
                Whatsapp
                <div className="icon">
                    <a href={`https://wa.me/${contact.phone.replace('+', "")}`}><i className="fab fa-whatsapp" style={{ color: "#25d366", borderColor: '#25d366' }}></i></a>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    editContact: e => dispatch({ type: EDIT_CONTACT, payload: e.target.getAttribute('getID') }),
    cancelBtn: () => dispatch({ type: CONTACT_CANCEL })
})

export default connect(null, mapDispatchToProps)(ContactCard)