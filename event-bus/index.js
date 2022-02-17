const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const events = [];

app.post("/events", (req, res) => {
  try {
    const event = req.body;

    events.push(event);

    axios.post("http://posts-clusterip-srv:4000/events", event);
    axios.post("http://comments-srv:4001/events", event);
    axios.post("http://query-srv:4002/events", event);
    axios.post("http://moderation-srv:4003/events", event);

    res.send({ status: "OK" });
  } catch (error) {
    console.log(error);
  }
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("listening on 4005");
});
