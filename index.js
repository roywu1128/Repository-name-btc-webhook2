const express = require("express");
const app = express();

app.use(express.text({ type: "*/*" }));

app.get("/", (req, res) => {
  res.send("Webhook server running");
});

app.post("/webhook", (req, res) => {

  const text = req.body;

  console.log("Webhook received:");
  console.log(text);

  // 抓 Ideal D 當 Entry
  const idealMatch = text.match(/Ideal D=(\d+\.?\d*)/);
  let entryPrice = null;

  if (idealMatch) {
    entryPrice = parseFloat(idealMatch[1]);
  }

  // 抓 TP1
  const tp1Match = text.match(/TP1:\s*(\d+\.?\d*)/);
  let tp1 = null;

  if (tp1Match) {
    tp1 = parseFloat(tp1Match[1]);
  }

  // 抓 TP2
  const tp2Match = text.match(/TP2:\s*(\d+\.?\d*)/);
  let tp2 = null;

  if (tp2Match) {
    tp2 = parseFloat(tp2Match[1]);
  }

  // 抓 SL
  const slMatch = text.match(/SL:\s*(\d+\.?\d*)/);
  let sl = null;

  if (slMatch) {
    sl = parseFloat(slMatch[1]);
  }

  console.log("Entry (Ideal D):", entryPrice);
  console.log("TP1:", tp1);
  console.log("TP2:", tp2);
  console.log("SL:", sl);

  res.json({
    status: "ok",
    entry: entryPrice,
    tp1: tp1,
    tp2: tp2,
    sl: sl
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
