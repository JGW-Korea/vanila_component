import { Component } from "../core";

export default class Header extends Component {
  constructor() {
    super({
      tagName: "header",
    });
  }

  render() {
    this.el.innerHTML = /* html */ `
      <nav>
        <ul>
          <li><a href="#/">Main!</a></li>
          <li><a href="#/about">About!</a></li>
        </ul>
      </nav>
    `;
  }
}
