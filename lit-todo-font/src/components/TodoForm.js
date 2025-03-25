import { html, LitElement } from "lit-element";

export class TodoForm extends LitElement {

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
                <div class="form-control">
                    <label>Title</label>
                    <input type="text" name="title" @input="${this.handleChange}" />
                </div>
            </form>
        `
    }
}

customElements.define( TodoForm.is, TodoForm );