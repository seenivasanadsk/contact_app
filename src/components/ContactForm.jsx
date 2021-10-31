import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CONTACT_CANCEL, FETCH_CONTACT } from '../types'
import './styles/ContactForm.css'
import DB from '../Dexie'

class ContactForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showImage: false,
            imageData: "",
            name: "",
            phone: "",
            email: "",
            id: "",
            nameError: false,
            phoneError: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.contact) {
            if (state.id !== props.contact.id) {
                return {
                    name: props.contact.name,
                    phone: props.contact.phone,
                    email: props.contact.email,
                    id: props.contact.id,
                    imageData: props.contact.imageUrl,
                    showImage: props.contact.imageUrl ? true : false,
                    type: props.type,
                    nameError: false,
                    phoneError: false
                }
            } else {
                return null
            }
        } else {
            if (props.type !== state.type) {
                return {
                    name: "",
                    phone: "",
                    email: "",
                    id: "",
                    imageData: null,
                    showImage: false,
                    type: "Save",
                    nameError: false,
                    phoneError: false
                }
            } else {
                return null
            }
        }
    }

    handleChange = e => {
        let type = e.target.name;
        let nameError = type === 'name' ? e.target.value === "" ? true : false : this.state.nameError
        let phoneError = type === 'phone' ? e.target.value === "" ? true : false : this.state.phoneError
        this.setState({ [type]: e.target.value, nameError, phoneError })
    }

    handleImage = e => {
        this.imageData(e.target.files[0])
    }

    imageData = file => {
        let fr = new FileReader();
        try {
            fr.readAsDataURL(file)
        } catch { }
        fr.onload = () => {
            this.setState({ imageData: fr.result, showImage: true, image: file })
        }
    }

    handleImageClose = e => {
        e.preventDefault();
        let file = document.querySelector('.ContactForm .image #image');
        file.value = ""
        file = undefined;
        this.setState({ showImage: false, imageData: null, image: "IGNORE" })
    }

    handleSubmit = e => {
        e.preventDefault();
        let name = this.state.name;
        let phone = this.state.phone;
        let nameError = name === "" ? true : false
        let phoneError = phone === "" ? true : false
        if (nameError || phoneError) {
            this.setState({ nameError, phoneError })
        } else {
            if (this.state.type === "Save") {
                let newData = {
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    imageUrl: this.state.imageData,
                }
                let contactDb = new DB;
                contactDb.addData(newData);
                this.props.updateList();
                this.props.cancelBtn();
            }
            else if (this.state.type === "Update") {
                let id = this.state.id
                let newData = {
                    name: this.state.name,
                    email: this.state.email,
                    phone: this.state.phone,
                    imageUrl: this.state.imageData,
                }
                let contactDb = new DB;
                contactDb.updateData(id,newData);
                this.props.updateList();
                this.props.cancelBtn();
            }
        }
    }

    render() {
        return (
            <div className='ContactForm'>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="image" className="image">
                        <img src={this.state.imageData} alt="" />
                        {
                            this.state.showImage ?
                                <span onClick={this.handleImageClose}>
                                    &times;
                                </span>
                                : <div>
                                    <span>+</span>
                                    <span>Add Image</span>
                                </div>
                        }
                        <input type="file" name="image" id="image" accept="image/png, image/jpeg" onChange={this.handleImage} />
                    </label>
                    <div className="field">
                        <label htmlFor="name">Enter Name:</label>
                        <input type="text" id="name" name="name" placeholder="Full Name" value={this.state.name} onChange={this.handleChange} />
                        <div className={`Error ${this.state.nameError ? 'd-block' : 'd-none'}`}>Name is Mandatory</div>
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Enter Phone Number:</label>
                        <input type="tel" id="phone" name="phone" placeholder="Number with Country code" value={this.state.phone} onChange={this.handleChange} />
                        <div className={`Error ${this.state.phoneError ? 'd-block' : 'd-none'}`}>Phone number is Mandatory</div>
                    </div>
                    <div className="field">
                        <label htmlFor="email">Enter Email Address:</label>
                        <input type="email" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="btn">
                        <button id="submitBtn" onClick={this.handleSubmit}>{this.props.type}</button>
                        <button id="cancelBtn" onClick={this.props.cancelBtn}>Cancel</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    cancelBtn: () => dispatch({ type: CONTACT_CANCEL }),
    updateList: () => {
        let contactDb = new DB;
        contactDb.viewData(data => dispatch({type:FETCH_CONTACT,payload:data}));
    }
})

export default connect(null, mapDispatchToProps)(ContactForm)