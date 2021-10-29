import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SEARCH_CONTACT, SEARCH_CANCEL } from '../types'
import './styles/ContactSearch.css'

class ContactSearch extends Component {
    constructor() {
        super();
        this.input = React.createRef();
    }

    render() {
        return (
            <div className='ContactSearch'>
                <div className="search">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search Contacts" ref={this.input} onChange={this.props.searchContct} />
                    <button onClick={
                        () => {
                            this.input.current.value = ""
                            this.props.searchCancel()
                        }
                    }>Cancel</button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    searchContct: val => dispatch({ type: SEARCH_CONTACT, payload: val.target.value }),
    searchCancel: () => dispatch({ type: SEARCH_CANCEL })
})

export default connect(null, mapDispatchToProps)(ContactSearch)