import { LitElement, html } from "lit-element";

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

    renderView() {
        return this.user
            ? html`<h2>User logged in</h2>`
            : html `<login-view></login-view>`
    }

    render() {
        return html`
            ${this.renderView()}
        `
    }
}

customElements.define( HomeView.is, HomeView );