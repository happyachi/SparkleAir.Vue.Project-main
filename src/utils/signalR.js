import * as signalR from "@microsoft/signalr";

export const connection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:8889/ChatHub")
  .configureLogging(signalR.LogLevel.Information)
  .build();

export async function start() {
  try {
    await connection.start();
    console.log("SignalR Connected.");
  } catch (err) {
    console.log(err);
    setTimeout(start, 5000);
  }
}

connection.onclose(async () => {
  await start();
});

connection.on("SendAll", (res) => {
  console.log(res, "收到消息");
});

connection.on("SendCaller", (res) => {
  console.log(res, "收到消息SendCaller");
});

connection.onclose((err) => {
  console.log("连接已经断开 执行函数onclose", err);
});

connection.on("SendCustomUserMessage", (res) => {
  console.log(res, "收到消息");
});
