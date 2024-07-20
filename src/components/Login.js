import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../api/authService';

const Login = ({ onLogin }) => {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = () => {
        setError('');
        setLoading(true);
        authenticate({ name, password })
            .then((resp) => {
                console.log(resp)
                if (resp.data.id != null && resp.data.id.length > 0) {
                    setLoading(false);
                    localStorage.setItem('userImag', resp.data.photoUrl)
                    localStorage.setItem('UserId', resp.data.id)
                    onLogin();
                    localStorage.setItem("isLoggedIn", "true")
                    navigate('/home');
                } else {
                    setLoading(false);
                    setError('Invalid User Name Or Passord');
                }
            })
            .catch((error) => {
                setLoading(false);
                setError(error.message);
                alert(error.message);
            });
    };

    return (
        <>
            <div className="flex justify-content-center align-items-center vh-100">
                <div className="card p-5">
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <div className="mb-3 text-danger">{error}</div>}
                    <div className="p-float-label  login-spaceBetween">
                        <InputText id="username" value={name} disabled={loading} onChange={(e) => setUsername(e.target.value)} className="p-inputtext-lg" />
                        <label htmlFor="username">User Name</label>
                    </div>
                    <div className="p-float-label login-spaceBetween">
                        <Password id="password" value={password} disabled={loading} onChange={(e) => setPassword(e.target.value)} toggleMask className="p-inputtext-lg" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <Button label={loading ? "Signing in..." : "Login"} disabled={loading} icon="pi pi-check" onClick={handleLogin} className="w-full" />
                </div>
            </div>
        </>
    );
};

export default Login;
