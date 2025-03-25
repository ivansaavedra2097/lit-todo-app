import { css, html, LitElement } from "lit-element";

export class TodoForm extends LitElement {

    static get styles() {
        return css`
            textarea {
                width: 100%;
                max-width: 500px;
                height: 150px;
                padding: 12px 20px;
                box-sizing: border-box;
                border: 2px solid #ccc;
                border-radius: 4px;
                background-color: #f8f8f8;
                font-size: 16px;
                resize: none;
                outline: none;
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
            title: "",
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
                <text-input label="Title"></text-input>
                <textarea-input label="Description"></textarea-input>
            </form>
        `
    }
}

customElements.define(TodoForm.is, TodoForm);