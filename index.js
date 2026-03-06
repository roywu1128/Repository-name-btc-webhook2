const express = require("express");
const app = express();

app.use(express.text({ type: "*/*" }));

app.get("/", (req, res) => {
  res.send("Webhook server running");
});

app.post("/webhook", (req, res) => {
  console.log("Webhook received:");
  console.log(req.body);

  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
