// 모든 컴포넌트의 기반이 되는 클래스 정의
export class Component {
  constructor(payload = {}) {
    const { tagName, state = {}, props = {} } = payload;

    // 지정된 태그 이름으로 DOM 요소 생성 (기본값: div)
    this.el = document.createElement(tagName || "div");

    // 컴포넌트 내부에서 활용되는 데이터 저장소
    // 화면 갱신을 자동으로 트리거하지 않으며, 단순히 데이터 보관용으로 사용
    this.state = state;

    // 컴포넌트 외부에서 전달된 값 (초기 렌더링 시 참조)
    this.props = props;

    // 초기 렌더링 메서드 호출
    this.render();
  }

  // 자식 컴포넌트에서 오버라이딩하여 개별 렌더링 로직을 구현
  render() {
    // ...
  }
}

// 라우터(Router) 전환 처리 -> 렌더링 로직
function routerRender(routes) {
  // Hash Router가 아닌 경우 초기 경로를 '/#/'로 설정 (예외 처리)
  if (!location.hash) {
    history.replaceState(null, "", "/#/");
  }

  const routerView = document.querySelector("router-view");
  const [hash, queryString = ""] = location.hash.split("?");

  // Query String 파싱 -> History State에 저장
  const query = queryString.split("&").reduce((acc, cur) => {
    const [key, value] = cur.split("=");
    acc[key] = value;
    return acc;
  }, {});

  history.replaceState(query, "");

  // 현재 경로에 맞는 라우트(Route) 찾기
  const currentRoute = routes.find((route) => new RegExp(`${route.path}/?$`).test(hash));

  // 라우터 뷰 초기화 후 해당 컴포넌트 렌더링
  routerView.innerHTML = "";
  routerView.appendChild(new currentRoute.component().el);

  // 페이지 전환 시 스크롤을 맨 위로 이동
  window.scrollTo(0, 0);
}

// 라우터(Router) 도구 정의 -> 초기화 + 이벤트 등록
export function createRouter(routes) {
  return function () {
    // popstate 이벤트 감지 -> URL 변경 시 라우트 렌더링
    window.addEventListener("popstate", () => {
      routerRender(routes);
    });

    // 최초 페이지 로드 시 라우트 렌더링
    routerRender(routes);
  };
}

//
export class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};

    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: (value) => {
          state[key] = value;
          this.observers[key].forEach((observer) => observer());
        },
      });
    }
  }

  subscribe(key, cb) {
    Array.isArray(this.observers[key]) ? this.observers[key].push(cb) : (this.observers[key] = [cb]);
  }
}
