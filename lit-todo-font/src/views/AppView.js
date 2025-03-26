import { LitElement, css, html } from "lit-element";
import { getTodos } from "../services/todos.services";

export class AppView extends LitElement {

    static get styles() {
        return css`
            :host {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            main {
                height: calc( 100vh - 60px );
                width: 100vw;
                background-color: #f2f2f2;
            }
        `
    }

    static get is() {
        return "app-view";
    }

    static get properties(){
        return {
            user: { type: Object },
            todos: { type: Array }
        }
    }

    constructor() {
        super();
        this.user = null;
        this.todos = []
    }

    connectedCallback() {
        super.connectedCallback();
        this.onGetUserTodos();
    }

    async onGetUserTodos() {
        try {
            const todos = await getTodos();
            this.todos = todos;
        } catch (error) {
            console.error( error.message );
        }
    }

    render() {
        return html`
            <my-navbar .username="${this.user?.username}"></my-navbar>
            <main>
                <todo-form></todo-form>
            </main>
        `
    }
}

customElements.define( AppView.is , AppView );