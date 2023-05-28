// 장바구니에 담은 상품 JSON형태로 로컬 스토리지에서 가져오기
export const getCartItems = () => {
  const carItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  return carItems;
};

// 장바구니에 담는 상품 JSON형태로 클라이언트 로컬 스토리지에 저장
export const setCartItems = (carItems) => {
  localStorage.setItem("cartItems", JSON.stringify(carItems));
};
