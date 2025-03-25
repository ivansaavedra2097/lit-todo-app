import { LitElement, html } from "lit-element";
import { currentUser } from "../services/auth.services";

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
        this.user = localStorage.getItem('todo-user') ?? null
    }

    handleSetAppUser(event)  {
        console.log('home-view', { event })
    }

    connectedCallback() {
        super.connectedCallback();
        currentUser()
        .then( user => this.user = user );
    }

    renderView() {
        return this.user
            ? html`<h2>User logged in</h2>`
            : html `<login-view @set-app-user="${this.handleSetAppUser}"></login-view>`
    }

    render() {
        return html`
            ${this.renderView()}
        `
    }
}

customElements.define( HomeView.is, HomeView );