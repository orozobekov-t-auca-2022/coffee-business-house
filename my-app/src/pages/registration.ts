export function renderRegistration():string{
    return `
        <div class="register-page">
            <h2>Registration</h2>
            <form class="register-form">
                <div class="register-input-wrapper firstRow">
                    <div class="input-group">
                        <label for="login">Login</label>
                        <input type="text" id="login" placeholder="Placeholder" required>
                    </div>

                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Placeholder" required>
                    </div>

                     <div class="input-group">
                        <label for="confirm-password">Confirm Password</label>
                        <input type="password" id="confirm-password" placeholder="Placeholder" required>
                    </div>
                </div>
                <div class="register-input-wrapper secondRow">
                     <div class="input-group">
                        <label for="city">City</label>
                        <input type="text" id="city" placeholder="Placeholder" required>
                    </div>

                     <div class="input-group">
                        <label for="street">Street</label>
                        <input type="text" id="street" placeholder="Placeholder" required>
                    </div>

                     <div class="input-group">
                        <label for="house-number">House number</label>
                        <input type="text" id="house-number" placeholder="Placeholder" required>
                    </div>

                    <div class="paying-options">
                        <label>Pay by</label>
                        <div class="paying-options-wrapper">
                            <div class="pay-option">
                                <input type="radio" id="cash" name="payment" value="cash">
                                <label for="cash">Cash</label>
                            </div>
                            <div class="pay-option">
                                <input type="radio" id="card" name="payment" value="card">
                                <label for="card">Card</label>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <button type="submit">Registration</button>
            </form>
        </div>
    `
}