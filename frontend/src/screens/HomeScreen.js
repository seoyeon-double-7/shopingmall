import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";
import { searchProducts } from "../api.js";
import url from "../../../url.js";

const HomeScreen = {
  after_render: async () => {
    // 검색했을 때 SearchScreen.render로 이동
    const sBtn = document.getElementById("search-btn");
    sBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const key = document.getElementById("product-search-data").value;
      document.location.hash = `/product/search/${key}`;
    });
  },
  render: async () => {
    const response = await axios({
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 응답 실패
    if (!response || response.statusText !== "OK") {
      return "<div> Error in getting Data </div>";
    }

    // 전체 상품 데이터 저장
    const products = await response.data.products;

    // 상단 글자 저장
    const title = document.getElementById("nav-title");
    title.innerText = "Products";

    // 페이징 (render 오류 => 개선예정)

    // var itemsPerPage = 10; // 페이지당 보여줄 상품 수 => 콤보 박스에서 읽어오기
    //   var currentPage = 1; // 현재 페이지

    //   var mainContainer = document.getElementById("main-container");
    //   var selectBox = document.createElement("select");
    //   selectBox.innerHTML = `<select id="pSelect_value" onchange="changeValue(this)">
    //     <option value="10">10개</option>
    //     <option value="9">9개</option>
    //     <option value="8">8개</option>
    //   </select>`;

    //   mainContainer.append(selectBox);

    //   var formBox = document.createElement("form");
    //   formBox.className = "search-form";
    //   formBox.innerHTML = `
    //     <input id="product-search-data" type="text" name="searchData"
    //     placeholder="검색어를 입력하세요" />
    //     <button id="search-btn">검색</button>
    //   `;

    //   mainContainer.append(formBox);

    //   function displayItems(page) {
    //     var startIndex = (page - 1) * itemsPerPage;
    //     var endIndex = startIndex + itemsPerPage;
    //     var itemsToDisplay = products.slice(startIndex, endIndex);

    //     var itemsContainer = document.getElementById("products");
    //     itemsContainer.innerHTML = "";

    //     for (var i = 0; i < itemsToDisplay.length; i++) {
    //       var item = itemsToDisplay[i];
    //       var itemElement = document.createElement("li");
    //       // itemElement.className = "item";
    //       itemElement.innerHTML = `
    //          <div class="product">
    //             <a href="/#/product/${item.id}">
    //               <img src="${item.images[0]}" alt="${item.name}">
    //                       </a>
    //                       <div class="product-name">
    //                           <a href="/#/product/1">
    //                               ${item.title}
    //                           </a>
    //                       </div>
    //                       <div class="product-price">
    //                           $ ${item.price}
    //                       </div>
    //                   </div>
    //       `;
    //       itemsContainer.appendChild(itemElement);
    //     }
    //   }

    //   function displayPagination() {
    //     var totalPages = Math.ceil(products.length / itemsPerPage);
    //     var pagination = document.getElementById("pagination");
    //     pagination.innerHTML = "";

    //     for (var i = 1; i <= totalPages; i++) {
    //       var pageLink = document.createElement("a");
    //       pageLink.href = "#";
    //       pageLink.textContent = i;

    //       if (i === currentPage) {
    //         pageLink.className = "active";
    //       } else {
    //         pageLink.addEventListener(
    //           "click",
    //           (function (pageNumber) {
    //             return function () {
    //               currentPage = pageNumber;
    //               displayItems(currentPage);
    //               displayPagination();
    //             };
    //           })(i)
    //         );
    //       }

    //       pagination.appendChild(pageLink);
    //     }
    //   }

    //   displayItems(currentPage);
    //   displayPagination();

    return `
      <select id="pSelect_value" onchange="changeValue(this)">
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
                              <a href="/#/product/${product.id}">
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

export default HomeScreen;
