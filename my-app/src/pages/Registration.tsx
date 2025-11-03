import { useState } from "react"
import type { RegistrationData } from "../types/register"

function Registration() {
    const [registerData, setRegisterData] = useState<RegistrationData>({
        login: '',
        password: '',
        confirmPassword: '',
        city: '',
        street: '',
        houseNumber: '',
        paymentMethod: null
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const inputsToValidate = [
        { id: 'login', message: '⚠ Login must start with a letter, contain only English letters and be at least 3 characters long' },
        { id: 'password', message: '⚠ Password must be at least 6 characters long and contain at least one special character' },
        { id: 'confirm-password', message: '⚠ Passwords do not match' },
        { id: 'city', message: '⚠ Please select a city' },
        { id: 'street', message: '⚠ Please select a street' },
        { id: 'house-number', message: '⚠ House number must be greater than 1' },
        { id: 'payment', message: '⚠ Please select a payment method' }
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
                    message = "Password must contain at least 6 chars, 1 letter and 1 number.";
                break;
            case "confirmPassword":
                    if (value !== registerData.password)
                        message = "Passwords do not match.";
                break;
            case "houseNumber":
                if (Number(value) < 1) message = "House number must be greater than 0.";
                break;
        }

        setErrors(prev => ({ ...prev, [name]: message }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        let finalVal = null;
        if(type === 'number'){
            if(value === ''){
                finalVal = '';
            } else {
                finalVal = Number(value);
            }
        } else {
            finalVal = value;
        }
        setRegisterData((prev) => ({
            ...prev,
            [name]: finalVal
        }))
        validateField(name, finalVal)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(registerData)
    }

    const cityToStreets = {
        Tokyo: ["Chuo-dori", "Omotesando", "Takeshita-dori", "Ueno", "Yanaka Ginza", "Akihabara", "Ginza", "Shibuya", "Harajuku", "Roppongi"],
        Kioto: ["Shijo-dori", "Pontocho", "Shimbashi-dori", "Yasaka-dori", "Shirakawa-dori", "Nishiki Market", "Gion", "Philosopher's Path", "Arashiyama", "Fushimi Inari"],
        Yokohama: ["Kawasaki", "Yokosuka", "Zushi", "Kamakura", "Fujisawa", "Yamato", "Machida", "Yamashita Park", "Minato Mirai", "Motomachi"]
    };

    return <>
        <div className="register-page">
            <h2>Registration</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-input-wrapper firstRow">
                    <div className="input-group">
                        <label htmlFor="login">Login</label>
                        <input type="text" id="login" name="login" placeholder="Placeholder" value={registerData.login} onChange={handleChange} required />
                        {errors.login && <span className="error">{errors.login}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Placeholder" value={registerData.password} onChange={handleChange} required />
                    </div>

                     <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirmPassword" placeholder="Placeholder" value={registerData.confirmPassword} onChange={handleChange} required />
                    </div>
                </div>
                <div className="register-input-wrapper secondRow">
                    <div className="input-group">
                        <label htmlFor="city">City</label>
                        <select className="drop-down" id="city" name="city" value={registerData.city} onChange={handleChange} required>
                            <option value="" disabled>Select a city</option>
                            <option value="Tokyo">Tokyo</option>
                            <option value="Kioto">Kioto</option>
                            <option value="Yokohama">Yokohama</option>
                        </select>
                    </div>


                     <div className="input-group">
                        <label htmlFor="street">Street</label>
                        <select className="drop-down" id="street" name="street" value={registerData.street} onChange={handleChange} required>
                            {
                                cityToStreets[registerData.city as keyof typeof cityToStreets]?.map((street) => (
                                    <option key={street} value={street}>{street}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="house-number">House number</label>
                        <input type="number" min="2" id="house-number" name="houseNumber" placeholder="Placeholder" value={registerData.houseNumber} onChange={handleChange} required />
                    </div>

                    <div className="paying-options">
                        <label>Pay by</label>
                        <div className="paying-options-wrapper">
                            <div className="pay-option">
                                <input type="radio" id="cash" name="paymentMethod" value="cash" checked={registerData.paymentMethod === 'cash'} onChange={handleChange} />
                                <label htmlFor="cash">Cash</label>
                            </div>
                            <div className="pay-option">
                                <input type="radio" id="card" name="paymentMethod" value="card" checked={registerData.paymentMethod === 'card'} onChange={handleChange} />
                                <label htmlFor="card">Card</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit">Registration</button>
                <div className="error-cred-message"></div>
            </form>
        </div>
    </>
}

export default Registration