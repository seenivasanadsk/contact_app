import ContactSearch from "./ContactSearch"
import ContactList from "./ContactList"
import AddContacts from "./AddContacts"
import "./styles/ContactManage.css"

function ContactManage(props) {
    return (
        <div className={`ContactManage ${props.class}`}>
            <AddContacts />
            <ContactSearch />
            <ContactList />
        </div>
    )
}

export default ContactManage