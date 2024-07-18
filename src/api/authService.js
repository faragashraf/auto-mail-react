// authService.js

// Simulated backend service for authentication
const authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
        // Simulate a delay to mimic server response time
        setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
                resolve({ authenticated: true });
            } else {
                reject(new Error('Invalid username or password'));
            }
        }, 1000); // Simulate 1 second delay
    });
};

export { authenticate };
