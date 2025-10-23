export function loginService(): void{
    const loginForm = document.querySelector(".login-form") as HTMLFormElement;

    if (!loginForm) {
        return;
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const login = (document.getElementById('login') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        let errorCredentials = loginForm.querySelector('.error-credentials') as HTMLDivElement;
        if (!errorCredentials) {
            errorCredentials = document.createElement('div');
            errorCredentials.classList.add('error-credentials');
            errorCredentials.textContent = '⚠ Invalid login or password';
            loginForm.insertAdjacentElement('beforeend', errorCredentials);
        }

        const formData = {
            login,
            password
        }


        const sender = await fetch(`${import.meta.env.VITE_COFFEE_API_KEY}` + `/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                errorCredentials.style.display = 'block';
                throw new Error(`Error with status: ${response.status}`);   
            }
            
            return response.json();
        }).then(response => {
            console.log('Successful POST ', response);
            errorCredentials.style.display = 'none';
            localStorage.setItem('token', response.token);
            window.location.href = '/menu';
        }).catch(error => {
            console.log(error)
        })
    })


    const inputsToValidate = [
        { id: 'login', message: '⚠ Login must start with a letter and contain only letters and numbers' },
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
            isValid = /^[A-Za-z][A-Za-z0-9]{2,}$/.test(input.value);
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

