import parseRequestUrl from "../utils.js";
import { getProducts } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
// 장바구니 물품추가
const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();

  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }
};

// 장바구니 물품 삭제 기능
const removeFromCart = (id) => {
  var cartItem = getCartItems();
  setCartItems(cartItem.filter((x) => x.product != id));

  // 리렌더링
  if (id === parseRequestUrl().id) {
    document.location.hash = "/cart";
  } else {
    location.reload();
  }
};

const CartScreen = {
  after_render: () => {
    // 장바구니 물품개수 조절 이벤트 & 기능
    const qtySelects = document.getElementsByClassName("qty-select");
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener("click", (e) => {
        let itemQty;
        const btnID = e.target.id;
        const item = getCartItems().find(
          (x) => x.product === e.target.parentNode.id
        );

        itemQty = btnID === "cart-up" ? (item.qty += 1) : (item.qty -= 1);
        itemQty = itemQty === 0 ? 1 : itemQty;

        addToCart({ ...item, qty: itemQty }, true);
      });
    });

    // 장바구니 상품 삭제시 removeFromCart 이동
    const deleteButtons = document.getElementsByClassName("delete-button");
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        removeFromCart(deleteButton.id);
      });
    });
  },
  render: async () => {
    const request = parseRequestUrl();

    if (request.id) {
      const product = await getProducts(request.id);
      addToCart({
        product: product.id,
        title: product.title,
        image: product.images[0],
        price: product.price,
        qty: request.cnt,
      });
    }
    const cartItems = getCartItems();
    var cartCnt = document.getElementById("cart-cnt");
    cartCnt.innerText = cartItems.reduce(
      (a, c) => Number(a) + Number(c.qty),
      0
    );
    return `
      <div class="content cart">
      <div class="back-to-result">
      <a class="back-btn" onclick={history.back()}> ◀ </a>
  </div>
        <div class="cart-list">
          <ul class="cart-list-container">
          ${
            cartItems.length === 0
              ? '<div><h3>장바구니가 비었습니다.</h3><a href="/#/">홈으로 가기</a>'
              : cartItems
                  .map(
                    (item) => `
          <li>
            <div class="cart-image">
              <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="cart-name">
              <div>
                <a href="/#/product/${item.product}">
                  ${item.title}
                </a>
              </div>
              <div class="qty-area">
                <div class="qty-board">
                  ${item.qty}개
                </div>
                <div class="qty-btn" id="${item.product}">
                  <i class="ri-arrow-up-s-line qty-select" id="cart-up"></i>
                  <i class="ri-arrow-down-s-line qty-select" id="cart-down"></i>
                </div>
                <button type="button" class="delete-button" id="${item.product}">
                  삭제
                </button>
              </div>
            </div>
          </li>
          `
                  )
                  .join("\n")
          }
      </ul>
    </div>
      `;
  },
};

export default CartScreen;
