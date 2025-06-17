// Example of a custom element (Web Component) for Age Info
class AgeInfo extends HTMLElement {
  static get observedAttributes() {
    return ["age"];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "age") {
      this.textContent = newValue ? `Your age is: ${newValue}` : "";
    }
  }
}
customElements.define("age-info", AgeInfo);

// Make this file a module for TypeScript isolatedModules compatibility
export {};