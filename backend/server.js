import url from "../url";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const URL = url;

app.use(bodyParser.urlencoded({ extended: true }));

// 상품 전체 조회
app.get("/api/products", (req, res) => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => res.send(data));
});

// 상품 상세 페이지
app.get("/api/products/:id", (req, res) => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const product = data.products.find(function (x) {
        if (x.id == req.params.id) return x;
      });
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: "product Not Found!" });
      }
    });
});

// 상품 조회

app.get("/api/products/search/:key", (req, res) => {
  fetch(url)
    .then((response) => response.json())
    .then((searchData) => {
      const searchProduct = searchData.products.filter(
        (item) =>
          item.title.match(new RegExp(req.params.key, "i")) ||
          item.brand.match(new RegExp(req.params.key, "i")) ||
          item.description.match(new RegExp(req.params.key, "i"))
      );
      if (searchProduct) {
        console.log(searchProduct[0]);
        res.send(searchProduct);
      } else {
        res.status(404).send({ message: "Search Data Is Not Found" });
      }
    })
    .then((result) => console.log(result));
});

app.listen(5000, () => {
  console.log("server at http://localhost:5000");
});
