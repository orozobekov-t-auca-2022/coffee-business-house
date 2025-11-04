import { useState } from "react";
import type { LoginData } from "../types/login";
import { loginService } from "../services/loginService";
import { useNavigate } from "react-router-dom";

function Login() {
    const [loginData, setLoginData] = useState<LoginData>({
        login: '',
        password: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
        validateField(name, value)
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginService(loginData);
        console.log('Login Data:', loginData);
        navigate('/menu');
    }

    const inputsToValidate = [
        { id: 'login', message: '⚠ Login must start with a letter and contain only English letters' },
        { id: 'password', message: '⚠ Password must be at least 6 characters long and contain at least one special character' }
    ];
    const regex = {
        login: /^[A-Za-z][A-Za-z]{2,}$/,
        password: /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
    }

    function validateField(name: string, value: string | number) {
        let message = "";

        switch (name) {
            case "login":
                if (!regex.login.test(String(value)))
                    message = inputsToValidate[0].message;
                break;
            case "password":
                if (!regex.password.test(String(value)))
                    message = inputsToValidate[1].message;
                break;
        }

        setErrors(prev => ({ ...prev, [name]: message }));
    }

    return <>
        <div className="login-page">
            <h2>Sign In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-input-wrapper">
                    <div className="input-group">
                        <label htmlFor="login">Login</label>
                        <input type="text" id="login" placeholder="Placeholder" onChange={handleChange} name="login" required />
                        {errors.login && <span className="error-message">{errors.login}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Placeholder" onChange={handleChange} name="password" required />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    </>
}

export default Login

