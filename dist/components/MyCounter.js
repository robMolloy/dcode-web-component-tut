let renderCount = 0;
export class MyCounter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    // Define the 'name' prop
    static get observedAttributes() {
        return ["count"];
    }
    // Handle changes to the observed attributes
    attributeChangedCallback() {
        this.render();
    }
    getCount() {
        return parseInt(this.getAttribute("count") || "0") || 0;
    }
    setCount(count) {
        this.setAttribute("count", `${count}`);
        if (this.onSetCount)
            this.onSetCount(count);
    }
    incrementCount() {
        this.setCount(this.getCount() + 1);
    }
    decrementCount() {
        this.setCount(this.getCount() - 1);
    }
    render() {
        renderCount += 1;
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
        <p>renderCount: ${renderCount}</p>
        <p>count: ${this.getCount()}</p>

        <div>
        <button type="button" class="decrement-button">-</button>
        <button type="button" class="increment-button">+</button>
        </div>
      `;
        const shadowRoot = this.shadowRoot;
        const incrementButton = shadowRoot.querySelector(".increment-button");
        const decrementButton = shadowRoot.querySelector(".decrement-button");
        incrementButton === null || incrementButton === void 0 ? void 0 : incrementButton.addEventListener("click", () => this.incrementCount());
        decrementButton === null || decrementButton === void 0 ? void 0 : decrementButton.addEventListener("click", () => this.decrementCount());
    }
}
customElements.define("my-counter", MyCounter);
