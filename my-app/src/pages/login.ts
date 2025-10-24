export function renderLogin():string{
    return `
        <div class="login-page">
            <h2>Sign In</h2>
            <form class="login-form">
                <div class="login-input-wrapper">
                    <div class="input-group">
                        <label for="login">Login</label>
                        <input type="text" id="login" placeholder="Placeholder" required>
                    </div>

                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Placeholder" required>
                    </div>
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    `
}