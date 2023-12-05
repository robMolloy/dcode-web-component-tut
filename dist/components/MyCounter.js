let renderCount = 0;
const attributeNames = ["count"];
export class MyCounter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        if (attributeNames.every((attName) => this.getAttribute(attName) === null))
            this.render();
    }
    // Define the 'name' prop
    static get observedAttributes() {
        return attributeNames;
    }
    // Handle changes to the observed attributes
    attributeChangedCallback() { }
    getCount() {
        return parseInt(this.getAttribute("count") || "0") || 0;
    }
    setCount(count) {
        this.setAttribute("count", `${count}`);
        this.render();
        if (this.onSetCount)
            this.onSetCount(count);
    }
    incrementCount() {
        this.setCount(this.getCount() + 1);
    }
    decrementCount() {
        this.setCount(this.getCount() - 1);
    }
    initRender() {
        const shadowRoot = this.shadowRoot;
        shadowRoot.innerHTML = `<style>@import url('./css/output.css');</style>
    <div id="main"></div>`;
    }
    contentRender() {
        const shadowRoot = this.shadowRoot;
        const main = shadowRoot.querySelector("#main");
        if (!main)
            return;
        main.innerHTML = `
    <p>renderCount: ${renderCount}</p>
    <p class="p-10 my-container bg-red-500">count: ${this.getCount()}</p>
    
    <div>
    <button type="button" class="decrement-button">-</button>
    <button type="button" class="increment-button">+</button>
    
    <button class="save-button">Save</button>
    
    </div>
    `;
        const incrementButton = shadowRoot.querySelector(".increment-button");
        const saveButton = shadowRoot.querySelector(".save-button");
        const decrementButton = shadowRoot.querySelector(".decrement-button");
        incrementButton === null || incrementButton === void 0 ? void 0 : incrementButton.addEventListener("click", () => this.incrementCount());
        decrementButton === null || decrementButton === void 0 ? void 0 : decrementButton.addEventListener("click", () => this.decrementCount());
        const savePayload = { detail: { value: this.getCount() } };
        const saveEvent = new CustomEvent("save", savePayload);
        saveButton === null || saveButton === void 0 ? void 0 : saveButton.addEventListener("click", () => {
            this.dispatchEvent(saveEvent);
        });
    }
    render() {
        renderCount += 1;
        if (!this.shadowRoot)
            return;
        else if (!this.shadowRoot.innerHTML)
            this.initRender();
        this.contentRender();
    }
}
customElements.define("my-counter", MyCounter);
