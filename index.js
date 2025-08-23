const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.get('/heart', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// เพิ่ม middleware สำหรับรับ json
app.use(express.json());

// เก็บข้อความใน memory
let messages = [];

app.get('/message', (req, res) => {
  const text = req.query.msg;
  if (!text) {
    return res.status(400).send('Missing text field');
  }
  if (messages.some(m => m.text === text)) {
    return res.status(409).send('Text already exists');
  }
  const msg = { text, timestamp: Date.now() };
  messages.push(msg);
  setTimeout(() => {
    messages = messages.filter(m => m !== msg);
  }, 10 * 60 * 1000);
  res.send('Message received: ' + text);
});

app.get('/messages', (req, res) => {
  res.json(messages);
});
