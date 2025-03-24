import { css, html, LitElement } from "lit-element";

export class LoginForm extends LitElement {

    static get is() {
        return 'login-form';
    }

    static get styles() {
        return css`
            main {
                
            }
            #show-password {
                position: absolute;
                top: 25px;
                right: 15px;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 15px;
                border-radius: 50%;
                border: none;
                cursor: pointer;
            }
            .container {
                width: 100vw;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: red;
            }
            .form-control {
                width: 100%;
                position: relative;
                display: flex;
                flex-direction: column;
                /* background-color: red; */
                padding: 5px 10px;
                margin: 5px 0;
                border-radius: 3px;
            }
            input {
                height: 30px;
            }
            button[type=submit] {
                width: 100%;
                background-color: blue;
                color: white;
                font-size: 14px;
                text-transform: uppercase;
                padding: 10px 12px;
                border: none;
                border-radius: 3px;
                font-weight: 600;
                letter-spacing: 2px;
                cursor: pointer;
                transition: all 0.25s linear;
            }
            button[type=submit]:hover {
                background-color: #2323bb;
            }
        `
    }

    static get properties() {
        return {
            user: { type: String },
            password: { type: String },
            showPassword: { type: Boolean },
            formState: { type: Object }
        }
    }

    constructor() {
        super();
        this.showPassword = false;
        this.formState = {
            user: "",
            password: ""
        }
    }

    onTogglePassword() {
        this.showPassword = !this.showPassword;
    }

    eyeIcon() {
        return html`
        <button type="button" id="show-password" @click="${this.onTogglePassword}">
            <img  src="./src/icons/${ this.showPassword ? "eye-slash-fill.svg":"eye-fill.svg" }" alt="Icono de ojo" />
        </button>
        `
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("submitting", { user: this.user, password: this.password, formState: this.formState })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.formState[ name ] = value.trim();
    }

    render() {
        return html`
            <div class="container">
                <form @submit="${this.handleSubmit}">
                    <div class="form-control">
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="user" 
                            @input="${this.handleChange}" 
                        />
                    </div>
                    <div class="form-control">
                        ${this.eyeIcon()}
                        <label>Password</label>
                        <input 
                            type="${this.showPassword ? "text" : "password"}" 
                            name="password" 
                            @input="${this.handleChange}" 
                        />
                    </div>
                        <button type="submit">submit</button>
                </form>
            </div>
        `
    }
}

customElements.define(LoginForm.is, LoginForm);