import { getProducts } from "../api.js";
import parseRequestUrl from "../utils.js";

const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById("add-button").addEventListener("click", () => {
      let productCnt = document.getElementById("product_cnt_input").value;
      if (productCnt > 0 && !(productCnt % 1)) {
        document.location.hash = `/cart/${request.id}/${productCnt}`;
      } else {
        alert("주문할 상품의 개수를 다시 입력해주세요");
      }
    });
  },
  render: async () => {
    // 클릭한 상품 id값 받아와서 상세 페이지 보여주기
    const request = parseRequestUrl();
    const product = await getProducts(request.id);
    if (product.error) {
      return product.error;
    }

    // 상단 글자 바꿔주기
    const title = document.getElementById("nav-title");
    title.innerText = "Product Details";

    return `
     <div class="content">
         <div class="back-to-result">
             <a class="back-btn" onclick={history.back()}> ◀ </a>
         </div>
         <div class="details">
             <div class="details-image">
                 <img src="${product.images[0]}" alt="${product.name}"/>
             </div>
             <div class="details-info">
                 <ul>
                     <li>
                        <h3>title</h3>
                        ${product.title}
                     </li>
                     <li>
                        <h3>brand</h3>
                         ${product.brand}
                     </li>
                     <li>
                        <h3>price</h3>
                        $${product.price}
                     </li>
                     <li>
                        <h3>stock</h3>
                         ${product.stock}
                     </li>
                     <li>
                        <h3>description</h3>
                             ${product.description}
                     </li>
                     <li>
                        <h3>discountPercentage</h3>
                         ${product.discountPercentage}
                     </li>
                  </ul>
                    <input id="product_cnt_input" type="text" name="product_cnt" placeholder="0" />
                    <button id="add-button" class="fw primary"> 장바구니 담기 </button>
        
             </div>
         </div>
     </div>
 `;
    // 수정 끝
  },
};

export default ProductScreen;
