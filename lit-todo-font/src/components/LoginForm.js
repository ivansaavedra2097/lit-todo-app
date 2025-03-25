import { css, html, LitElement } from "lit-element";
import { login } from "../services/auth.services";
import { LS_TYPES } from "../types/index.js"

export class LoginForm extends LitElement {

    static get is() {
        return 'login-form';
    }

    static get styles() {
        return css`
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
            form {
                width: 70%;
            }
            .container {
                width: 100vw;
                max-width: 620px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 1px solid gray;
                padding: 30px 0;
                border-radius: 8px;
            }
            .form-control {
                width: 100%;
                position: relative;
                display: flex;
                flex-direction: column;
                padding: 5px 0;
                margin: 5px 0;
                border-radius: 3px;
            }
            label {
                width: 100%;
            }
            input {
                height: 30px;
            }
            button:disabled {
                cursor: auto;
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
            button[type=submit]:disabled {
                background-color: gray;
                cursor: auto;
            }
        `
    }

    static get properties() {
        return {
            user: { type: String },
            password: { type: String },
            showPassword: { type: Boolean },
            formState: { type: Object },
            loading: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.showPassword = false;
        this.formState = {
            user: "caraperoo1@mail.com",
            password: "123456"
        },
        this.loading = false;
        this.errorMessage = "";
    }

    get isError() {
        return Boolean( this.errorMessage );
    }

    onTogglePassword() {
        this.showPassword = !this.showPassword;
    }

    eyeIcon() {
        return html`
        <button type="button" id="show-password" @click="${this.onTogglePassword}" ?disabled="${this.loading}">
            <img  src="./src/icons/${this.showPassword ? "eye-slash-fill.svg" : "eye-fill.svg"}" alt="Icono de ojo" />
        </button>
        `
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleLogin( this.formState.user, this.formState.password );
        // console.log("submitting", { user: this.user, password: this.password, formState: this.formState })
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.formState[name] = value.trim();
    }

    setAppUserEvent( user ) {
        console.log('setAppUser', { user })
        const event = new CustomEvent('set-app-user', {
            detail: user,
            bubbles: true,
            composed: true
        });
        console.log({ event })
        this.dispatchEvent( event );
    }

    async handleLogin( email, password ) {
        this.loading = true;
        try {
            const { user, token }= await login( email, password );
            console.log({ user, token });
            localStorage.setItem( LS_TYPES.token, token );
            this.setAppUserEvent( user );
        } catch (error) {
            this.errorMessage = error.message;
        } finally {
            this.loading = false;
        }
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
                            ?disabled="${this.loading}"
                        />
                    </div>
                    <div class="form-control">
                        ${this.eyeIcon()}
                        <label>Password</label>
                        <input 
                            type="${this.showPassword ? "text" : "password"}" 
                            name="password" 
                            @input="${this.handleChange}" 
                            ?disabled="${this.loading}"
                        />
                    </div>
                    <button type="submit" ?disabled="${this.loading}">
                        ${this.loading ? "loading..." : "submit"}
                    </button>
                </form>
            </div>
        `
    }
}

customElements.define(LoginForm.is, LoginForm);