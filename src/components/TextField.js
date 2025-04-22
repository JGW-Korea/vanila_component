import { Component } from "../core";

export default class TextField extends Component {
  render() {
    this.el.innerHTML = /* html */ `
      <input type="text" />
    `;

    const inputEl = this.el.querySelector("input");
    inputEl.addEventListener("input", () => {
      console.log(inputEl.value);
    });
  }
}
