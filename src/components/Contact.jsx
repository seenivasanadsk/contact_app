import React from 'react'
import ContactManage from './ContactManage'
import ContactView from './ContactView'
import './styles/Contact.css'

function Contact() {
    return (
        <div className='Contact container'>
            <div className="row">
                <div className="col-md-6 d-none d-md-block">
                    <ContactManage />
                </div>
                <div className="col-md-6">
                    <ContactView />
                </div>
            </div>
        </div>
    )
}

export default Contact