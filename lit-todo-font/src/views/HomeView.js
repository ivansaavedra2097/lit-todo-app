import { LitElement, html } from "lit-element";
import { currentUser } from "../services/auth.services";
import { LS_TYPES } from "../types";

export class HomeView extends LitElement {

    static get properties() {
        return {
            user: {
                type: Object
            }
        }
    }

    static get is() {
        return "home-view";
    }

    constructor() {
        super();
        this.user = null;
    }

    handleSetAppUser(event)  {
        const user = event.detail;
        this.user = user;
    }

    hanldeUnsetAppUser() {
        this.user = null;
        localStorage.removeItem(LS_TYPES.token);
    }

    connectedCallback() {
        super.connectedCallback();
        currentUser()
        .then( user => this.user = user )
        .catch( err => console.error( err ))
    }

    renderView() {
        return this.user
            ? html`<app-view .user="${this.user}" @unset-app-user="${this.hanldeUnsetAppUser}"></app-view>`
            : html `<login-view @set-app-user="${this.handleSetAppUser}"></login-view>`
    }

    render() {
        return html`
            ${this.renderView()}
        `
    }
}

customElements.define( HomeView.is, HomeView );