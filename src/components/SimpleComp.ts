export class SimpleComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `<button class="buy-button">buy</button>`;

    const buyButton = this.shadowRoot.querySelector(".buy-button");
    const buyEventPayload = { detail: { value: 42 } };
    const buyEvent = new CustomEvent("buy", buyEventPayload);

    buyButton?.addEventListener("click", () => {
      console.log("firing dispatch event...");
      this.dispatchEvent(buyEvent);
    });
  }
}

customElements.define("simple-comp", SimpleComp);
