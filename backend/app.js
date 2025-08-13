import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";
import {push} from "karma/lib/init/log-queue.js";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.post("/events", async (req, res) => {

  const event = req.body;
  const fileContent = await fs.readFile("./data/events.json");

  const eventsData = JSON.parse(fileContent);

  eventsData.push(event);

  let updatedEvents = eventsData;
  await fs.writeFile(
    "./data/events.json",
    JSON.stringify(updatedEvents)
  );

  res.status(201).json(eventsData);
})

app.get("/events", async (req, res) => {
  //await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile("./data/events.json");

  const eventsData = JSON.parse(fileContent);

  res.status(200).json(eventsData);
});

app.delete("/event/:id", async (req, res) => {
  const eventId = Number(req.params.id);
  const eventsFileContent = await fs.readFile("./data/events.json");
  const eventsData = JSON.parse(eventsFileContent);
  const eventIndex = eventsData.findIndex((event) => event.id === eventId);

  let updatedEvents = eventsData;

  if (eventIndex >= 0) {
    updatedEvents.splice(eventIndex, 1);
  }

  await fs.writeFile(
    "./data/events.json",
    JSON.stringify(updatedEvents)
  );

  res.status(200).json(updatedEvents);
});

app.listen(3000);
