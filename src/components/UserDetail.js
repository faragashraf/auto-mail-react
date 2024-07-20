import React, { useState, useEffect, useRef } from 'react';
import {  useParams } from 'react-router-dom';
import { getContact, udpateContact, udpatePhoto } from '../api/ContactService';
import { Toast } from 'primereact/toast';

const UserDetail = ({ updateContact, updateImage }) => {
    const inputRef = useRef();
    const [user, setUser] = useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
        photoUrl: ''
    });

    const { id } = useParams();

    const fetchContact = async (id) => {
        try {
            const { data } = await getContact(id);
            setUser(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const selectImage = () => {
        inputRef.current.click();
    };

    updateImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await udpatePhoto(formData);
            const { data } = await getContact(id);
            console.log('data',data)
           await setUser(data);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'User photo has been updated', life: 3000 });
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = async (event) => {
       await setUser({ ...user, [event.target.name]: event.target.value });
    };

    const toast = useRef(null);
    updateContact = async (event) => {
        event.preventDefault();
        try {
             await udpateContact(user);
            await fetchContact(id);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'User has been updated', life: 3000 });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchContact(id);
    }, []);

    return (
        <>
            <Toast ref={toast} />
            <div className='profile'>
                <div className='profile__details'>
                    <img src={user.photoUrl} alt={`Profile photo of ${user.name}`} />
                    <div className='profile__metadata'>
                        <p className='profile__name'>{user.name}</p>
                        <p className='profile__muted'>JPG, GIF, or PNG. Max size of 10MG</p>
                        <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Change Photo</button>
                    </div>
                </div>
                <div className='profile__settings'>
                    <div>
                        <form onSubmit={updateContact} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={user.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input type="text" value={user.name} onChange={onChange} name="name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="text" value={user.email} onChange={onChange} name="email" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone</span>
                                    <input type="text" value={user.phone} onChange={onChange} name="phone" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Address</span>
                                    <input type="text" value={user.address} onChange={onChange} name="address" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Title</span>
                                    <input type="text" value={user.title} onChange={onChange} name="title" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Status</span>
                                    <input type="text" value={user.status} onChange={onChange} name="status" required />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type="submit" className="btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => updateImage(event.target.files[0])} name='file' accept='image/*' />
            </form>
        </>
    )
}

export default UserDetail