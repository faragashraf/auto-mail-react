import React from 'react'
import '../App.css'; // Import your custom CSS file
import { useRef, useState } from 'react';
import { getContacts, saveContact, udpatePhoto } from '../api/ContactService';
import { useParams, useLocation } from 'react-router-dom';
import { Toast } from 'primereact/toast';

const AddNewUser = () => {
    const modalRef = useRef();
    const fileRef = useRef();
    const [data, setData] = useState({});
    const [file, setFile] = useState(null);
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
    });
    const toast = useRef(null);
    // Use useParams to read route parameters
    const { id } = useParams();
    const location = useLocation();


    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleNewUser = async (event) => {
        event.preventDefault();
        try {
            const { data } = await saveContact(values);
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', data.id);
            const { data: photoUrl } = await udpatePhoto(formData);
            //   toggleModal(false);
            setFile(null);
            fileRef.current.value = null;
            setValues({
                name: '',
                email: '',
                phone: '',
                address: '',
                title: '',
                status: '',
            })
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'File created', life: 3000 });
        } catch (error) {
            console.log(error);
        }
    };
    const updateContact = async (contact) => {
        try {
            const { data } = await saveContact(contact);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateImage = async (formData) => {
        try {
            const { data: photoUrl } = await udpatePhoto(formData);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();
    return (
        <>
            <Toast ref={toast} />
            <div className={`user_body ${location.pathname == '/viewUser' ? 'disabled' : ''}`} >
                <div className="modal__header">
                    <h3>New User</h3>
                    <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
                </div>
                <div className="divider"></div>
                <div className="modal__body">
                    <form onSubmit={handleNewUser}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input type="text" value={values.name} onChange={onChange} name='name' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="text" value={values.email} onChange={onChange} name='email' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Title</span>
                                <input type="text" value={values.title} onChange={onChange} name='title' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input type="text" value={values.address} onChange={onChange} name='address' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Account Status</span>
                                <input type="text" value={values.status} onChange={onChange} name='status' required />
                            </div>
                            <div className="file-input">
                                <span className="details">Profile Photo</span>
                                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo'  accept='image/*' required />
                            </div>
                        </div>
                        <div className="form_footer">
                            {/* <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button> */}
                            <button type='submit' className="btn">Save</button>
                        </div>
                    </form>
                    {/* <button onClick={() => {setFile(null);console.log("Clicked")}} >   <i className='bi bi-plus-square'></i>Clear</button> */}
                </div>
                {/* <div>
                    <h1>User ID: {id}</h1>
                    <p>Current Path: {location.pathname}</p>
                    <p>Search Params: {location.search}</p>
                </div> */}
            </div>
            {/* Modal */}
            <dialog ref={modalRef} className="modal" id="modal">
                <div className="modal__header">
                    <h3>New Contact</h3>
                    <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
                </div>
                <div className="divider"></div>
                <div className="modal__body">
                    <form onSubmit={handleNewUser}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input type="text" value={values.name} onChange={onChange} name='name' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="text" value={values.email} onChange={onChange} name='email' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Title</span>
                                <input type="text" value={values.title} onChange={onChange} name='title' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input type="text" value={values.address} onChange={onChange} name='address' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Account Status</span>
                                <input type="text" value={values.status} onChange={onChange} name='status' required />
                            </div>
                            <div className="file-input">
                                <span className="details">Profile Photo</span>
                                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo'   accept='image/*' required />
                            </div>
                        </div>
                        <div className="form_footer">
                            <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
                            <button type='submit' className="btn">Save</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default AddNewUser