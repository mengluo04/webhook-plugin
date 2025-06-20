import express from "express";
import { createServer } from "http";
export const name = "webhook-Plugin";
// 创建 Express 应用
const app = Bot.express;
const server = createServer(app);

// 中间件：解析 JSON 请求体
app.use(express.json());

// 路由示例：GET 接口
app.get("/webhook/test", (req, res) => {
  res.send("这是测试消息返回");
});

// 路由示例：POST 接口（处理外部数据）
app.post("/webhook/send", (req, res) => {
  logger.mark(`[webhook-Plugin] 收到数据：${JSON.stringify(req.body)}`);
  const { qq, title, content } = req.body;
  const msg = `通知标题：${title}\n通知内容：${content}`;
  Bot.pickUser(qq)
    .sendMsg(msg)
    .then(() => {
      res.json({ code: 0, message: "发送成功" });
    })
    .catch((error) => {
      logger.error(`[webhook-Plugin] 发送消息失败：${error}`);
      res.json({ code: -1, message: JSON.stringify(error) });
    });
});

// 错误处理
app.use((err, req, res, next) => {
  logger.error("[webhook-plugin] 错误:", err);
  res.status(500).json({ error: "服务器内部错误" });
});

logger.mark(`[${name}] webhook 服务已启动`);
