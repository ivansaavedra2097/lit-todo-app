import { css, html, LitElement } from "lit-element";
import { createTodo } from "../services/todos.services";

export class TodoForm extends LitElement {

    static get styles() {
        return css`
            :host {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            form {
                width: 100%;
                max-width: 500px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                background-color: white;
                padding: 30px;
                border-radius: 8px;
            }
            button {
                align-self: center;
                width: calc(100% - 10px);
                padding: 5px;
                text-transform: uppercase;
                font-size: 14px;
                letter-spacing: 1px;
                cursor: pointer;
                background-color: #0060bdcf;
                color: white;
                font-weight: 600;
                border-radius: 3px;
                border: none;
            }
            button:hover{
                background-color: #036cd1cf;
                color: #fdfdfd;
            }
            button:disabled {
                background-color: gray;
                cursor: auto;
            }
        `
    }

    static get is() {
        return "todo-form";
    }

    static get properties() {
        return {
            title: { type: String },
            description: { type: String },
            loading: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.title = "";
        this.description = "";
        this.loading = false;
    }

    handleChange(e) {
        const { name, value } = e.target;
        this[name] = value; // <--  Actualizamos las propiedades title o description
    }

    addTodo( todo ) {
        const event = new CustomEvent('add-todo', {
            bubbles: true,
            composed: true,
            detail: todo
        });
        this.dispatchEvent( event );
    }

    async handleSubmit(e) {
        e.preventDefault();
        try {
            const todo = await createTodo(
                this.title,
                this.description
            );
            this.addTodo( todo );
            this.title = "";
        this.description = "";
        } catch (error) {
            
        }
    }

    render() {
        return html`
            <form @submit="${this.handleSubmit}">
                <text-input 
                    label="Title"
                    name="title" 
                    .value="${this.title}"
                    @input-change=${this.handleChange}
                ></text-input>
                <textarea-input 
                    label="Description" 
                    name="description"
                    .value="${this.description}"
                    @input-change="${this.handleChange}"
                ></textarea-input>
                <button ?disabled="${this.loading}">
                    ${ this.loading ? "loading...": "create" }
                </button>
            </form>
        `
    }
}

customElements.define(TodoForm.is, TodoForm);