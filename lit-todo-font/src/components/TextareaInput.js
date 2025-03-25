import { css, html, LitElement } from "lit-element"

export class TextareaInput extends LitElement {
    static get is() {
        return "textarea-input";
    }

    static get styles() {
        return css`
            .form-control {
                position: relative;
                width: calc(100% - 10px);
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: white;
                padding: 10px 5px;
                z-index: 0;
            }
             textarea {
                width: 100%;
                height: 150px;
                padding: 8px 8px;
                box-sizing: border-box;
                border: 2px solid #ccc;
                border-radius: 4px;
                background-color: #f8f8f8;
                font-size: 16px;
                resize: none;
                outline: none;
                font-family: sans-serif;
            }
            .form-control > label {
                position: absolute;
                top: 20px;
                left: 15px;
                color: gray;
                border-radius: 8px;
                z-index: 0;
                transition: all 0.10s linear;
            }
            .form-control.focused > label {
                transform: translate(-4px, -20px);
                font-size: 12px;
                padding: 3px 5px;
                z-index: 200;
                background-color: white;
            }
            .form-control.active > textarea {
                border: 2px solid #4971c5;
                outline: 3px solid #0075ff4a;
                border-radius: 3px;
            }
        `
    }

    static get properties() {
        return {
            label: { type: Object },
            value: { type: String },
            focused: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.label = "";
        this.value = "";
        this.focused = false;
    }

    get focusedClass() {
        return Boolean(this.value) || this.focused ? " focused " : " ";
    }

    onFocus(e) {
        this.focused = true;
    }

    onBlur(e) {
        this.focused = false;
    }

    handleChange(e) {
        this.value = e.target.value;
    }

    render() {
        return html`
            <div class="form-control${this.focusedClass}${this.focused ? "active": ""}">
                <label for="todo-textarea">Description</label>
                <textarea 
                    id="todo-textarea"
                    .value="${this.value}" 
                    @input="${this.handleChange}" 
                    @focus="${this.onFocus}"
                    @blur="${this.onBlur}"
                ></textarea>
            </div>
        `
    }
}

customElements.define(TextareaInput.is, TextareaInput);