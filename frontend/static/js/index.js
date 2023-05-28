import Products from "./views/Products";

// 새로고침 없이 페이지 전환, 뒤로가기 & 앞으로 가기 활성화
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

// path : url 주소, view : 렌더링할 페이지
const router = async () => {
  // 각 route의 경로와 현재 페이지 확인용 콘솔
  const routes = [
    { path: "/", view: Products },
    // {
    //   path: "/products/search",
    //   view: () => console.log("Viewing Searching Product"),
    // },
    // {
    //   path: "/products/productId",
    //   view: () => console.log("Viewing Searching Single Product"),
    // },
    { path: "/carts", view: () => console.log("Viewing Carts") },
  ];

  // 기본 url 뒤에 붙는 주소와 일차한다면 isMatch를 true로 변경
  const pageMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: route.path === location.pathname,
    };
  });

  // isMatch가 true인 객체 찾기
  let match = pageMatches.find((pageMatch) => pageMatch.isMatch);
  // view 함수 출력
  // console.log(match.route.view());

  const view = new match.route.view();

  // view의 html을 app 엘리먼트에 삽입
  document.querySelector("#app").innerHTML = await view.getHtml();
};

// 뒤로가기, 새로고침 => router 페이지에 맞게 동작
window.addEventListener("popstate", router);

// router 함수 실행 => DOM이 렌더링 될때
document.addEventListener("DOMContentLoaded", () => {
  // 클릭 이벤트가 발생했을 때,
  // 해당 target이 'data-link' attribute가 있다면
  // 페이지 이동 함수 실행
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
