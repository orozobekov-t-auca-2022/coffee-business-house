import { useEffect, useState } from "react"
import type { RegistrationData } from "../types/register"
import { registrationService } from "../services/registrationService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const {t} = useTranslation();

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
                    message = inputsToValidate[1].message;
                break;
            case "confirmPassword":
                    if (value !== registerData.password)
                        message = inputsToValidate[2].message;
                break;
            case "city":
                    if (!value) message = inputsToValidate[3].message;
                break;
            case "street":
                    if (!value) message = inputsToValidate[4].message;
                break;
            case "houseNumber":
                if (Number(value) < 2) message = inputsToValidate[5].message;
                break;
            case "paymentMethod":
                    if (!value) message = inputsToValidate[6].message;
                break;
        }

        setErrors(prev => ({ ...prev, [name]: message }));
    }
    useEffect(() => {
        if(registerData.password !== registerData.confirmPassword) {
            validateField('confirmPassword', registerData.confirmPassword);
        }
    }, [registerData.password])

    useEffect(() => {
        if(!registerData.city) {
            validateField('city', registerData.city)
        }
        if(!registerData.street) {
            validateField('street', registerData.street)
        }
    }, [registerData.city])

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

    const navigate = useNavigate()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        try{
            registrationService(registerData)
            navigate('/menu')
        } catch (error) {
            console.error("Registration failed:", error)
        }
    }

    const cityToStreets = {
        Tokyo: ["Chuo-dori", "Omotesando", "Takeshita-dori", "Ueno", "Yanaka Ginza", "Akihabara", "Ginza", "Shibuya", "Harajuku", "Roppongi"],
        Kioto: ["Shijo-dori", "Pontocho", "Shimbashi-dori", "Yasaka-dori", "Shirakawa-dori", "Nishiki Market", "Gion", "Philosopher's Path", "Arashiyama", "Fushimi Inari"],
        Yokohama: ["Kawasaki", "Yokosuka", "Zushi", "Kamakura", "Fujisawa", "Yamato", "Machida", "Yamashita Park", "Minato Mirai", "Motomachi"]
    };

    useEffect(() => {
        const hasErrors = Object.values(errors).some(err => err)
        const hasAllFilled = registerData.login && registerData.password && registerData.confirmPassword && registerData.city && registerData.street && registerData.houseNumber && registerData.paymentMethod;
        setIsFormValid(!hasErrors && Boolean(hasAllFilled))
    },[errors, registerData])

    return <>
        <div className="register-page">
            <h2>{t("registration_page_title_create_account")}</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-input-wrapper firstRow">
                    <div className="input-group">
                        <label htmlFor="login">{t("registration_page_input_login")}</label>
                        <input type="text" id="login" name="login" placeholder="Placeholder" value={registerData.login} onChange={handleChange} required />
                        {errors.login && <span className="error-message">{errors.login}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">{t("registration_page_input_password")}</label>
                        <input type="password" id="password" name="password" placeholder="Placeholder" value={registerData.password} onChange={handleChange} required />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                     <div className="input-group">
                        <label htmlFor="confirm-password">{t("registration_page_input_confirm_password")}</label>
                        <input type="password" id="confirm-password" name="confirmPassword" placeholder="Placeholder" value={registerData.confirmPassword} onChange={handleChange} required />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>
                </div>
                <div className="register-input-wrapper secondRow">
                    <div className="input-group">
                        <label htmlFor="city">{t("registration_page_input_city")}</label>
                        <select className="drop-down" id="city" name="city" value={registerData.city} onChange={handleChange} required>
                            <option value="" disabled>Select a city</option>
                            <option value="Tokyo">Tokyo</option>
                            <option value="Kioto">Kioto</option>
                            <option value="Yokohama">Yokohama</option>
                        </select>
                        {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>


                     <div className="input-group">
                        <label htmlFor="street">{t("registration_page_input_street")}</label>
                        <select className="drop-down" id="street" name="street" value={registerData.street} onChange={handleChange} required>
                            <option value="" disabled>Select a street</option>
                            {
                                cityToStreets[registerData.city as keyof typeof cityToStreets]?.map((street) => (
                                    <option key={street} value={street}>{street}</option>
                                ))
                            }
                        </select>
                        {errors.street && <span className="error-message">{errors.street}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="house-number">{t("registration_page_input_house_number")}</label>
                        <input type="number" min="2" id="house-number" name="houseNumber" placeholder="Placeholder" value={registerData.houseNumber} onChange={handleChange} required />
                        {errors.houseNumber && <span className="error-message">{errors.houseNumber}</span>}
                    </div>

                    <div className="paying-options">
                        <label>{t("registration_page_input_payment_method")}</label>
                        <div className="paying-options-wrapper">
                            <div className="pay-option">
                                <input type="radio" id="cash" name="paymentMethod" value="cash" checked={registerData.paymentMethod === 'cash'} onChange={handleChange} />
                                <label htmlFor="cash">{t("registration_page_input_payment_method_cash")}</label>
                            </div>
                            <div className="pay-option">
                                <input type="radio" id="card" name="paymentMethod" value="card" checked={registerData.paymentMethod === 'card'} onChange={handleChange} />
                                <label htmlFor="card">{t("registration_page_input_payment_method_card")}</label>
                            </div>
                        </div>
                        {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}
                    </div>
                </div>
                <button type="submit" disabled={!isFormValid}>Registration</button>
            </form>
        </div>
    </>
}

export default Registration