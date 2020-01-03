const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dbUrl = "mongodb://127.0.0.1:27017/chat-app";
mongoose.connect(dbUrl, err => {
  console.log("mongodb connected", err);
});

const Message = mongoose.model("Message", { name: String, message: String });

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
})

app.post('/messages', (req, res) => {
  let message = new Message(req.body);
  console.log(req.body);
  message.save((err) => {
    if (err) {
      sendStatus(400);
    }
    res.sendStatus(200);
  })
})

const server = app.listen(3000, () => {
  console.log("Server is running on port " + server.address().port);
});
