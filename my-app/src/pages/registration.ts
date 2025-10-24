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
                        <select class="drop-down" id="city" required>
                            <option value="" disabled selected>Select a city</option>
                            <option value="Tokyo">Tokyo</option>
                            <option value="Kioto">Kioto</option>
                            <option value="Yokohama">Yokohama</option>
                        </select>
                    </div>


                     <div class="input-group">
                        <label for="street">Street</label>
                        <select class="drop-down" id="street" required>

                        </select>
                    </div>

                    <div class="input-group">
                        <label for="house-number">House number</label>
                        <input type="number" min="2" id="house-number" placeholder="Placeholder" required>
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