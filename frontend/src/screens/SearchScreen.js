import { searchProducts } from "../api.js";
import parseRequestUrl from "../utils.js";

const SearchScreen = {
  render: async () => {
    const key = parseRequestUrl().key;
    // products : key를 검색한 상품 목록
    const products = await searchProducts(key);

    return `
    <select name="job" onchange="onNumChange">
      <option value="">개수선택</option>
      <option value="10">10개</option>
      <option value="9">9개</option>
      <option value="8">8개</option>
    </select>

    <form class="search-form">
      <input id="product-search-data" type="text" name="searchData" 
      placeholder="검색어를 입력하세요" />
      <button id="search-btn">검색</button>
    </form>
        <ul class="products">
        
            ${products
              .map(
                (product) => `
                <li>
                    <div class="product">
                        <a href="/#/product/${product.id}">
                            <img src="${product.images[0]}" alt="${product.name}">
                        </a>
                        <div class="product-name">
                            <a href="/#/product/1">
                                ${product.title}
                            </a>
                        </div>
                        <div class="product-price">
                            $ ${product.price}
                        </div>
                    </div>
                </li>
            `
              )
              .join("\n")}
       
    `;
  },
};

export default SearchScreen;
