import http from "http";
import SocketIO from "socket.io";
import express from "express";


// ES module 환경에서 __dirname 재구성
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// pug 설정
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// 정적파일 경로
app.use("/public", express.static(path.join(__dirname, "public")));

// 라우트
app.get("/home", (req, res) => res.render("home"));
app.get("*", (req, res) => res.redirect("/home")); // /home 아래 있어야 함

// 서버
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  console.log(socket);
})

// 실행
httpServer.listen(3000, () =>
  console.log("Listening on http://localhost:3000")
);
