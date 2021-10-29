import React from 'react'
import { connect } from 'react-redux'
import { ADD_CONTACT } from '../types'
import './styles/AddContacts.css'

function AddContacts(props) {
    return (
        <div className='AddContacts'>
            <button onClick={props.addContact}>Add Contacts</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({ addContact: () => dispatch({ type: ADD_CONTACT }) })

export default connect(null, mapDispatchToProps)(AddContacts)