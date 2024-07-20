// authService.js
import axios from "axios";
const baseUrl = 'http://localhost:8080/api/v1/user'


export async function authenticate(contact) {
    return await axios.post(baseUrl+'/login', contact);
}

// Simulated backend service for authentication

// const authenticate = (username, password) => {
//     return new Promise((resolve, reject) => {
//         // Simulate a delay to mimic server response time
//         setTimeout(() => {
//             if (username === 'admin' && password === 'Hemonad105046') {
//                 resolve({ authenticated: true });
//             } else {
//                 reject(new Error('Invalid username or password'));
//             }
//         }, 1000); // Simulate 1 second delay
//     });
// };

// export { authenticate };
