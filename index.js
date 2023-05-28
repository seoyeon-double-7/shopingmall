const express = require("express");
const path = require("path");

const app = express();

// middleware 설정
// '/static'으로 시작하는 경로 => frontend/static이 기본 고정 경로가 됨
app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

// 모든 경로에서 index.html 파일 불러오기
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

// 서버 실행
app.listen(process.env.PORT || 8088, () =>
  console.log("Server running on port 8088 ")
);
