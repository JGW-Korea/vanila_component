import Header from "./components/Header";
import { Component } from "./core";

// App 컴포넌트 -> 고정 영역(Header...)과 전환 영역(Router-View)을 구성하는 레이아웃 컴포넌트
export default class App extends Component {
  // 부모 클래스의 render 메서드를 오버라이딩하여 렌더링 로직 구현
  render() {
    // 라우팅에 따라 전환될 영역 확보(router-view)
    // 반드시 'router-view'가 아니어도 되고, div 등 블록 요소도 사용 가능하다.
    const routerView = document.createElement("router-view");

    // 고정 영역(Header...)와 전환 영역(Router-View)을 조립하여 기본 레이아웃 구성
    this.el.append(new Header().el, routerView);
  }
}
