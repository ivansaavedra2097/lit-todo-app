import { css, html, LitElement } from "lit-element";

export class MyNavbar extends LitElement {

    static get styles() {
        return css`
            :host {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            nav {
                width: 100%;
                height: 60px;
                background-color: #9cc9d5;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
            nav > span {
                margin-left: 10px;
                text-transform: uppercase;
            }
            nav > button {
                margin-left: auto;
                margin-right: 10px;
                text-transform: uppercase;
                padding: 5px 8px;
                background-color: #c62c2c;
                border: none;
                border-radius: 3px;
                color: white;
                cursor: pointer;
            }
        `
    }

    static get is() {
        return "my-navbar";
    }

    static get properties() {
        return {
            username: { type: String }
        }
    }

    constructor() {
        super();
        this.username = "";
    }

    handleLogout() {
        const event = new CustomEvent('unset-app-user', {
            detail: true,
            bubbles: true,
            composed: true
        });
        this.dispatchEvent( event );
    }

    render() {
        return html`
            <nav>
                <span>${this.username}</span>
            <button @click="${this.handleLogout}">Logout</button>
            </nav>
        `
    }
}

customElements.define(MyNavbar.is, MyNavbar);