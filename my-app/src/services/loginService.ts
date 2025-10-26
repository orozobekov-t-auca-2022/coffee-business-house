import { showSuccess } from "../components/showSuccess";
import { router } from "../router";
import { safeFetch } from './http';

export function loginService(): void{
    const loginForm = document.querySelector(".login-form") as HTMLFormElement;

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const login = (document.getElementById('login') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        const formData = {
            login,
            password
        }

        let errorCredentials = loginForm.querySelector('.error-credentials') as HTMLDivElement;
        if (!errorCredentials) {
            errorCredentials = document.createElement('div');
            errorCredentials.classList.add('error-credentials');
            errorCredentials.textContent = '⚠ Invalid login or password';
            errorCredentials.style.display = 'none';
            errorCredentials.setAttribute('role', 'alert');
            errorCredentials.setAttribute('aria-live', 'assertive');
            loginForm.insertAdjacentElement('beforeend', errorCredentials);
        }
        errorCredentials.style.display = 'none';

        try {
            const res = await safeFetch(`${import.meta.env.VITE_COFFEE_API_KEY}` + `/auth/login`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                errorCredentials.style.display = 'block';
                throw new Error(`Error with status: ${res.status}`);
            }
            const response = await res.json();
            showSuccess("Login successful! Redirecting to menu...");
            errorCredentials.style.display = 'none';
            localStorage.setItem('token', response.data.access_token);
            const base = import.meta.env.BASE_URL ?? '/';
            history.pushState({}, "", `${base}menu`);
            router();
        } catch (error) {
            console.error(error);
        }
    })


    const inputsToValidate = [
        { id: 'login', message: '⚠ Login must start with a letter and contain only English letters' },
        { id: 'password', message: '⚠ Password must be at least 6 characters long and contain at least one special character' }
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
            isValid = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/.test(input.value);
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

