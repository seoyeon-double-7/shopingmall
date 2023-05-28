> 본 프로젝트는 와이파이가 잘 되는 환경에서 터미널에 'npm run dev'를 입력해서 실행시켜주세요

### api 설계

| Function        | Method | End-Point             |
| --------------- | ------ | --------------------- |
| 홈(상품)페이지  | GET    | /                     |
| 검색페이지      | GET    | /product/search/{key} |
| 상품 상세페이지 | GET    | /product/{productId}  |
| 장바구니 페이지 | GET    | /cart                 |
| 장바구니 등록   | GET    | /cart/{id}/{count}    |
