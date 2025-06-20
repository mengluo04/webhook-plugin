# Webhook Plugin for QQ Bot

基于 Yunzai Bot 的 Webhook 插件，支持通过 HTTP 接口向指定 QQ 用户推送消息。

## 🔧 接口说明

### 1. 服务测试接口

```http
GET /webhook/test
```

### 2. 消息推送接口

```http
POST /webhook/send
```

####  请求体

```json
{
  "qq": 接收者QQ号,
  "title": "通知标题",
  "content": "通知正文内容"
}
```
## ⚠️ 注意事项
- QQ 号必须是机器人已添加的好友
- 请求必须携带 `Content-Type: application/json` 头