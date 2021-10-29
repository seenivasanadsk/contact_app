import React, { Component } from 'react'
import { connect } from 'react-redux'
import { EDIT_CONTACT, VIEW_CONTACT , FETCH_CONTACT} from '../types'
import './styles/List.css'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contactList: []
        }
    }

    handleSelect = e => {
        e.preventDefault();
        e.stopPropagation();
        this.props.viewContact(e.currentTarget.id)
    }

    deleteContact = e => {
        let targetId = e.target.getAttribute('getID')
        let form = new FormData();
        form.append('type','Delete');
        form.append('id',targetId);
        fetch('http://localhost/seeni/contactApp/back.php', {
            method: "post",
            body: form
        }).then(x => this.props.updateList())
    }

    render() {
        return (
            <div className='List'>
                {
                    this.props.contactList.map(x => {
                        return (
                            <div className="item" key={x.id}>
                                <div className="people" id={x.id} onClick={this.handleSelect}>
                                    <div className="img">
                                        <img src={x.imageUrl ? x.imageUrl : "/profile0.png"} alt={x.name} />
                                    </div>
                                    <div className="content" >
                                        <div className="name">{x.name}</div>
                                        <div className="email">{x.phone}</div>
                                    </div>
                                </div>
                                <div className="action">
                                    <i getid={x.id} onClick={this.props.editContact} style={{ color: "blue", borderColor: 'blue' }} className="fas fa-edit"></i>
                                    <i getid={x.id} onClick={this.deleteContact} style={{ color: "red", borderColor: 'red' }} className="fas fa-trash"></i>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({ contactList: state.ContactReducer.contactList })

const mapDispatchToProps = dispatch => ({
    viewContact: val => dispatch({ type: VIEW_CONTACT, payload: val }),
    editContact: e => dispatch({ type: EDIT_CONTACT, payload: e.target.getAttribute('getID') }),
    updateList: () => {
        fetch('http://localhost/seeni/contactApp/back.php').then(res => res.json()).then(res => {
            dispatch({ type: FETCH_CONTACT, payload: res })
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(List)