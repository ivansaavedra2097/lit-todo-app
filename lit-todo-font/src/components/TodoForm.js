import { css, html, LitElement } from "lit-element";

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
            todo: { type: Object }
        }
    }

    constructor() {
        super();
        this.todo = {
            title: "titulo",
            description: ""
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.todo[name] = value;
    }

    render() {
        return html`
            <form>
                <text-input label="Title" .value="${this.todo.title}"></text-input>
                <textarea-input label="Description" .value="${this.todo.description}"></textarea-input>
                <button ?disabled="${true}">create</button>
            </form>
        `
    }
}

customElements.define(TodoForm.is, TodoForm);