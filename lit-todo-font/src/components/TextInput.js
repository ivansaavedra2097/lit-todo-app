import { css, html, LitElement } from "lit-element";

export class TextInput extends LitElement {
    
    static get is() {
        return "text-input";
    }

    static get styles() {
        return css`
            :host {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: sans-serif;
            }
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
            .form-control > label {
                position: absolute;
                top: 17px;
                left: 10px;
                color: gray;
                border-radius: 8px;
                z-index: 0;
                transition: all 0.10s linear;
            }
            .form-control > input {
                position: relative;
                width: 100%;
                height: 20px;
                padding: 8px 8px;
                z-index: 100;
                background-color: transparent;
                border: 1px transparent;
                border-bottom: 2px solid gray;
                outline: none;
            }
            .form-control.focused > label {
                transform: translate(-4px, -17px);
                font-size: 12px;
                padding: 3px 5px;
                z-index: 200;
                background-color: white;
            }
            .form-control.active > input {
                border-bottom:  2px solid #4971c5;
                outline: 3px solid #0075ff4a;
                border-radius: 3px;
            }
        `
    }

    static get properties() {
        return {
            value: { type: String },
            label: { type: String },
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
                <label>${this.label}</label>
                <input 
                    type="text" 
                    .value="${this.value}" 
                    @input="${this.handleChange}" 
                    @focus="${this.onFocus}"
                    @blur="${this.onBlur}"
                />
            </div>
        `
    }
}

customElements.define( TextInput.is, TextInput );