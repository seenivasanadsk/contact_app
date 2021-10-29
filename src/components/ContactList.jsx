import List from './List'
import './styles/ContactList.css'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FETCH_CONTACT } from '../types'

class ContactList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contactList: []
        }
    }

    render() {
        return (
            <div className='ContactList'>
                <List contactList={this.state.contactList} />
            </div>
        )
    }

    componentDidMount() {
        this.props.fetchContact()
    }
}

const mapDispatchToProps = dispatch => ({
    fetchContact: () => {
        fetch('http://localhost/seeni/contactApp/back.php').then(res => res.json()).then(res => {
            dispatch({ type: FETCH_CONTACT, payload: res })
        })
    }
})

export default connect(null, mapDispatchToProps)(ContactList)