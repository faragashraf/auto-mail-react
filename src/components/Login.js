import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../api/authService';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { string } from 'yup';
const Login = ({ onLogin }) => {

    const formik = useFormik(
        {
            initialValues: {
                username: '',
                password: ''
            },
            validationSchema: Yup.object({
                username: string().required("This field is required").min(4, "Length Must be 4 characters or less"),
                password: string().required("This field is required")
            })
            ,
            onSubmit: (values) => { handleLogin(values); console.log(values); }
        }
    )
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = ({username, password}) => {
        setError('');
        setLoading(true);
        authenticate({username, password})
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
            {/* <div className="flex justify-content-center align-items-center vh-100">
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
            </div> */}

            <div className="flex justify-content-center align-items-center vh-100">
                <div className="card p-5">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={formik.handleSubmit} >
                        {error && <div className="mb-3 text-danger">{error}</div>}
                        <div className="p-float-label  login-spaceBetween">
                            <InputText
                                id="username"
                                name='username'
                                placeholder='User Name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                disabled={loading}
                                className="p-inputtext-lg" />
                            <label htmlFor="username">User Name</label>
                            {formik.touched.username && formik.errors.username ? <p className='red-alert'>{formik.errors.username}</p> : null}
                        </div>
                        <div className="p-float-label login-spaceBetween">
                            <Password
                                id="password"
                                name='password'
                                placeholder='User Name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                disabled={loading}
                                toggleMask
                                className="p-inputtext-lg" />
                            <label htmlFor="password">Password</label>
                            {formik.touched.password && formik.errors.password ? <p className='red-alert'>{formik.errors.password}</p> : null}
                        </div>
                        <Button type="submit" label={loading ? "Signing in..." : "Login"} disabled={loading} icon="pi pi-check" className="w-full" />
                    </form>
                </div>
            </div >
        </>
    );
};

export default Login;
