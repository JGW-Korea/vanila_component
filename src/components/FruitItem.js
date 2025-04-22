// 자식 컴포넌트
// 부모 컴포넌트로부터 전달받은 props를 활용해 개별 아이템 요소를 생성
import { Component } from "../core";

export default class FruitItem extends Component {
  // 부모 컴포넌트에서 전달받은 props를 초기화 시 함께 전달
  constructor(payload) {
    super({
      tagName: "li",
      props: payload.props, // 부모에서 전달된 name과 price 사용
    });
  }

  // 부모 클래스의 render 메서드를 오버라이딩하여 렌더링 로직 구현
  render() {
    // 전달받은 props를 기반으로 요소 내부 구조를 정의
    this.el.innerHTML = /* html */ `
      <span>${this.props.name}</span>
      <span>${this.props.price}</span>
    `;

    // 요소 클릭 시, 현재 아이템의 name과 price를 출력
    this.el.addEventListener("click", () => {
      console.log(this.props.name, this.props.price);
    });
  }
}
