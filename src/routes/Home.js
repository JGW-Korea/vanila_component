import Message from "../components/Message";
import TextField from "../components/TextField";
import Title from "../components/Title";
import { Component } from "../core";

export default class Home extends Component {
  render() {
    this.el.innerHTML = /* html */ `
      <h1>Home Page</h1>
    `;

    this.el.append(new TextField().el, new Message().el, new Title().el);
  }
}
