let renderCount = 0;
export class MyCounter extends HTMLElement {
    constructor() {
        super();
        this.onSetCount = () => { };
        this.attachShadow({ mode: "open" });
        this.blah = 1231231213;
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
        <p>val: ${this.getCount()}! This is a custom greeting!</p>
        ${this.blah}asd
        <div>
          <button type="button" class="increment-button">+</button>
          <button type="button" class="decrement-button">-</button>
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
