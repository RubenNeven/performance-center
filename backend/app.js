import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();
const eventsFile = './data/events.json';
const healthDataFile = './data/health.json';


app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/events", async (req, res) => {
  //await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile(eventsFile);

  const eventData = JSON.parse(fileContent);

  res.status(200).json(eventData);
});



app.delete("/events/:id", async (req, res) => {
  const eventId = Number(req.params.id);

  //return res.status(500).json();

  const eventsFileContent = await fs.readFile(eventsFile);
  const eventsData = JSON.parse(eventsFileContent);

  const eventIndex = eventsData.findIndex((event) => event.id === eventId);
  let updatedEvents = eventsData;

  if (eventIndex >= 0) {
    updatedEvents.splice(eventIndex, 1);
  }

  await fs.writeFile(
    eventsFile,
    JSON.stringify(updatedEvents)
  );

  res.status(200).json(updatedEvents);
});

app.post("/events", async (req, res) => {

  const event = req.body;

  const eventsFileContent = await fs.readFile(eventsFile);
  const eventsData = JSON.parse(eventsFileContent);

  let updatedEvents = [...eventsData, event];

  await fs.writeFile(
    eventsFile,
    JSON.stringify(updatedEvents)
  );

  res.status(200).json(updatedEvents);
});

app.get("/healthData", async (req, res) => {

  const fileContent = await fs.readFile(healthDataFile);

  const healthData = JSON.parse(fileContent);

  res.status(200).json(healthData);
});

app.post("/healthData", async (req, res) => {

  const data = req.body;

  const healthDataFileContent = await fs.readFile(healthDataFile);
  const healthData = JSON.parse(healthDataFileContent);

  let updatedHealthData = [...healthData, data];

  await fs.writeFile(
    healthDataFile,
    JSON.stringify(updatedHealthData)
  );

  res.status(200).json(updatedHealthData);
});

app.listen(3000);
