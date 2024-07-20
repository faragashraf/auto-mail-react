import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    const active = {
        color: 'green'
    };

    const notactive = {
        color: 'red'
    };
    return (
        <Link to={`/users/${user.id}`} className="contact__item">
            <div className="contact__header">
                <div className="contact__image">
                    <img src={user.photoUrl} alt={user.name} />
                </div>
                <div className="contact__details">
                    <p className="contact_name">{user.name.substring(0, 15)} </p>
                    <p className="contact_title">{user.title}</p>
                </div>
            </div>
            <div className="contact__body">
                <p><i className="pi pi-envelope"></i> {user.email.substring(0, 20)} </p>
                <p><i className="pi pi-flag"></i> {user.address.substring(0, 20)}</p>
                <p><i className="pi pi-phone"></i> {user.phone}</p>
                <p style={user.status === 'Active' ? active : notactive}>{user.status === 'Active' ? <i className='pi pi-check-circle' style={active}></i> :
                    <i className='pi pi-ban' ></i>} {user.status}</p>
            </div>
        </Link>
    )
}

export default User