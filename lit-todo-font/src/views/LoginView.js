import { css, html, LitElement } from "lit-element"

export class LoginView extends LitElement {
    static get is() {
        return 'login-view';
    }

    static get styles() {
        return css`
            main{
                width: 100vw;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        `
    }

    render() {
        return html`
            <main>
                <h2>Login</h2>
                <login-form></login-form>
            </main>
        `
    }
}

customElements.define( LoginView.is, LoginView );