import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1/user';

export async function saveContact(contact) {
    return await axios.post(API_URL + '/userID', contact);
}

export async function getContacts(page = 0, size = 10) {
    return await axios.get(`${API_URL + '/getUsers'}?page=${page}&size=${size}`);
}

export async function getContact(id) {
    return await axios.get(`${API_URL}/${id}`);
}

export async function udpateContact(contact) {
    return await axios.post(API_URL + '/updateUser', contact);
}

export async function udpatePhoto(formData) {
    return await axios.put(`${API_URL}/photo`, formData);
}

export async function deleteContact(id) {
    return await axios.delete(`${API_URL}/${id}`);
}