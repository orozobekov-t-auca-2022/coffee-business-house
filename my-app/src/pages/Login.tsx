function Login() {
    return <>
        <div className="login-page">
            <h2>Sign In</h2>
            <form className="login-form">
                <div className="login-input-wrapper">
                    <div className="input-group">
                        <label htmlFor="login">Login</label>
                        <input type="text" id="login" placeholder="Placeholder" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Placeholder" required />
                    </div>
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    </>
}

export default Login

