import { ADD_CONTACT, CONTACT_CANCEL, EDIT_CONTACT, FETCH_CONTACT, SEARCH_CANCEL, SEARCH_CONTACT, VIEW_CONTACT } from "../types";

const initialState = {
    contactList: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTACT:
            console.log(typeof action.payload)
            return {
                ...state,
                mainContact: action.payload,
                contactList: [...action.payload],
            }
        case SEARCH_CONTACT:
            let list = [...state.mainContact]
            list = list.filter(x => {
                let name = x.name.toLowerCase();
                let val = action.payload.toLowerCase();
                if (name.includes(val)) {
                    return x
                }
            })
            return {
                ...state,
                contactList: list
            }
        case SEARCH_CANCEL:
            return {
                ...state,
                contactList: [...state.mainContact]
            }
        case VIEW_CONTACT:
            return {
                ...state,
                viewContact: state.contactList.filter(x => x.id == action.payload)[0],
                addContact: false,
                editContact: false
            }
        case ADD_CONTACT:
            return {
                ...state,
                addContact: true,
                editContact: false,
                viewContact: false
            }
        case EDIT_CONTACT: {
            return {
                ...state,
                editContact: state.contactList.filter(x => x.id == action.payload)[0],
                addContact: false,
                viewContact: false
            }
        }
        case CONTACT_CANCEL: {
            return {
                ...state,
                editContact: false,
                addContact: false,
                viewContact: false
            }
        }
        default:
            return state
    }
}