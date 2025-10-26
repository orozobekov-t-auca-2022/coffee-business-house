import { showSuccess } from "../components/showSuccess";
import { safeFetch } from './http';

export function registrationService():void{
    const regForm = document.querySelector(".register-form") as HTMLFormElement;

    if (!regForm) {
        return;
    }

    const registerButton = regForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    if (registerButton) {
        registerButton.disabled = true;
        registerButton.classList.add('disabled');
    }

    function isFormValidRealtime(): boolean {
        const login = (document.getElementById('login') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;
        const city = (document.getElementById('city') as HTMLInputElement).value;
        const street = (document.getElementById('street') as HTMLInputElement).value;
        const houseNumber = (document.getElementById('house-number') as HTMLInputElement).value;
        const paymentOptions = document.getElementsByName('payment') as NodeListOf<HTMLInputElement>;

        const loginRegex = /^[A-Za-z][A-Za-z]{2,}$/;
        if(!loginRegex.test(login)) return false;

        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
        if (!passwordRegex.test(password)) return false;
        if (password !== confirmPassword) return false;

        if (isNaN(Number(houseNumber)) || Number(houseNumber) <= 1) return false;
        if (!city || city.trim() === '') return false;
        if (!street || street.trim() === '') return false;
        if (!Array.from(paymentOptions).some(opt => opt.checked)) return false;

        return true;
    }

    regForm.addEventListener('input', () => {
        if (registerButton) {
            const valid = isFormValidRealtime();
            registerButton.disabled = !valid;
            registerButton.classList.toggle('disabled', !valid);
        }
        const credError = document.querySelector('.error-cred-message') as HTMLElement | null;
        if (credError) credError.textContent = '';
    });
    regForm.addEventListener('change', () => {
        if (registerButton) {
            const valid = isFormValidRealtime();
            registerButton.disabled = !valid;
            registerButton.classList.toggle('disabled', !valid);
        }
    });

    regForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const login = (document.getElementById('login') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const confirmPassword = (document.getElementById('confirm-password') as HTMLInputElement).value;
        const city = (document.getElementById('city') as HTMLInputElement).value;
        const street = (document.getElementById('street') as HTMLInputElement).value;
        const houseNumber = (document.getElementById('house-number') as HTMLInputElement).value;
        const paymentOptions = document.getElementsByName('payment') as NodeListOf<HTMLInputElement>;
        let selectedPaymentOption = '';

        if (!isFormValidRealtime()) return;
        for(const option of paymentOptions) {
            if(option.checked) {
                selectedPaymentOption = option.value;
                break;
            }
        }

        const formData = {
            login,
            password,
            confirmPassword,
            city,
            street,
            houseNumber: Number(houseNumber),
            paymentMethod: selectedPaymentOption
        }


        try {
            const res = await safeFetch(`${import.meta.env.VITE_COFFEE_API_KEY}` + `/auth/register`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                throw new Error(`Error with status: ${res.status}`);
            }
            await res.json();
            showSuccess("Registration successful! You can now log in.");
            const credError = document.querySelector('.error-cred-message') as HTMLElement | null;
            if (credError) credError.textContent = '';
        } catch (error) {
            const msg = 'Something wrong happened during registration. The user with the same credentials already exists.';
            const existing = document.querySelector('.error-cred-message') as HTMLElement | null;
            if (existing) {
                existing.innerHTML = `<p>${msg}</p>`;
            } else {
                const errDiv = document.createElement('div');
                errDiv.className = 'error-cred-message';
                errDiv.innerHTML = `<p>${msg}</p>`;
                regForm.prepend(errDiv);
            }

            if (registerButton) {
                registerButton.disabled = false;
                registerButton.classList.remove('disabled');
            }
            console.error(error);
        }
    })

    const cityToStreets = {
            Tokyo: ["Chuo-dori", "Omotesando", "Takeshita-dori", "Ueno", "Yanaka Ginza", "Akihabara", "Ginza", "Shibuya", "Harajuku", "Roppongi"],
            Kioto: ["Shijo-dori", "Pontocho", "Shimbashi-dori", "Yasaka-dori", "Shirakawa-dori", "Nishiki Market", "Gion", "Philosopher's Path", "Arashiyama", "Fushimi Inari"],
            Yokohama: ["Kawasaki", "Yokosuka", "Zushi", "Kamakura", "Fujisawa", "Yamato", "Machida", "Yamashita Park", "Minato Mirai", "Motomachi"]
        };

        const citiesDropDown = document.getElementById('city') as HTMLSelectElement;
        citiesDropDown.addEventListener('change', (event) => {
            const selectedCity = (event.target as HTMLSelectElement).value;
            const streets = cityToStreets[selectedCity as keyof typeof cityToStreets] || [];
            console.log(streets);
            const streetSelect = document.getElementById('street') as HTMLSelectElement;
            streetSelect.innerHTML = '<option value="" disabled selected>Select a street</option>';
            streets.forEach(street => {
                const option = document.createElement('option');
                option.value = street;
                option.textContent = street;
                streetSelect.appendChild(option);
            });
        });

    const inputsToValidate = [
        { id: 'login', message: '⚠ Login must start with a letter, contain only English letters and be at least 3 characters long' },
        { id: 'password', message: '⚠ Password must be at least 6 characters long and contain at least one special character' },
        { id: 'confirm-password', message: '⚠ Passwords do not match' },
        { id: 'city', message: '⚠ Please select a city' },
        { id: 'street', message: '⚠ Please select a street' },
        { id: 'house-number', message: '⚠ House number must be greater than 1' },
        { id: 'payment', message: '⚠ Please select a payment method' }
    ];

    inputsToValidate.forEach(({ id, message }) => {
        const input = document.getElementById(id) as HTMLInputElement;
        if (!input) return;

        const errorMsg = document.createElement('div');
        errorMsg.classList.add('error-message');
        input.insertAdjacentElement('afterend', errorMsg);

        input.addEventListener('blur', () => {
        let isValid = true;

        if (id === 'login') {
            isValid = /^[A-Za-z][A-Za-z]{2,}$/.test(input.value);
        } else if (id === 'password') {
            isValid = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/.test(input.value);
        } else if (id === 'confirm-password') {
            const password = (document.getElementById('password') as HTMLInputElement).value;
            isValid = input.value === password;
        } else if (id === 'house-number') {
            const num = Number(input.value);
            isValid = !isNaN(num) && num > 1;
        } else if (id === 'city' || id === 'street') {
            isValid = input.value.trim() !== '';
        } else if (id === 'payment') {
            const paymentOptions = document.getElementsByName('payment') as NodeListOf<HTMLInputElement>;
            isValid = Array.from(paymentOptions).some(option => option.checked);
        }

        if (!isValid) {
            input.classList.add('input-error');
            errorMsg.textContent = message;
            } else {
            input.classList.remove('input-error');
            errorMsg.textContent = '';
            }
        });

        input.addEventListener('focus', () => {
            input.classList.remove('input-error');
            errorMsg.textContent = '';
        });
    });

}