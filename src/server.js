import http from "http";
import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";

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
const server = http.createServer(app);

// ws 최신버전 권장 방식
const wss = new WebSocketServer({ server });

/*
on method에서는 event가 발동하는 걸 기다린다.
현재는 connection 이벤트를 기다린다.
또 함수를 두번째 매개변수로 받는데, 이벤트가 생기면 작동한다.
on method는 backend에 연결된 사람의 정보를 제공해주는데,
그 정보는 socket에서 온다.
여기의 소켓은 연결된 브라우저를 app의 소켓은 서버로의 연결이다. 
*/
wss.on("connection", (socket) => {
  console.log("Connected to Browser ✅");

  socket.on("close", () => (console.log("Disconnected to Browser ❌")));
  
  socket.on("message", (msg) => {
    console.log("browser sent >", msg.toString());
  });

  socket.send("hello!!");
});

// 실행
server.listen(3000, () =>
  console.log("Listening on http://localhost:3000")
);
