import { LitElement, css, html } from "lit-element";

export class AppView extends LitElement {

    static get styles() {
        return css`
            :host {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
        `
    }

    static get is() {
        return "app-view";
    }

    static get properties(){
        return {
            user: { type: Object }
        }
    }

    constructor() {
        super();
        this.user = null;
    }


    render() {
        return html`<my-navbar .username="${this.user?.username}"></my-navbar>`
    }
}

customElements.define( AppView.is , AppView );