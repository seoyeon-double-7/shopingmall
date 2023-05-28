import parseRequestUrl from "./utils.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import CartScreen from "./screens/CartScreen.js";
import SearchScreen from "./screens/SearchScreen.js";

// 기본 라우트 설정
const routes = {
  "/": HomeScreen,
  "/product/search/:key": SearchScreen,
  "/product/:id": ProductScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
};

const router = async () => {
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.action ? `/${request.action}` : "") +
    (request.id ? "/:id" : "") +
    (request.key ? "/:key" : "");

  // 현재 경로 받아와서 스크린 보여주기

  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const mainContainer = document.getElementById("main-container");

  // mainContainer에 들어갈 html 넣어주기
  // 각각의 screen의 render 함수 실행
  // screen.after_render 존재하면 렌더 후 실행
  mainContainer.innerHTML = await screen.render();
  if (screen.after_render && parseUrl == "/product/search/:key") {
    mainContainer.innerHTML = await screen.after_render();
  } else if (screen.after_render) screen.after_render();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
