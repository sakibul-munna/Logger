const express = require("express");
const bodyParser = require("body-parser");
const { Client } = require("@elastic/elasticsearch");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

const client = new Client({
  node: "https://es01:9200",
  auth: {
    username: "elastic",
    password: process.env.ELASTIC_PASSWORD,
  },
  ssl: {
    ca: fs.readFileSync("/usr/share/elasticsearch/config/certs/ca/ca.crt"),
    rejectUnauthorized: false,
  },
});

app.post("/logs", async (req, res) => {
  try {
    const { id, appName, logData } = req.body;

    const response = await client.index({
      index: "logs",
      body: {
        id,
        appName,
        logData,
      },
    });

    res.status(201).json({ message: "Log stored successfully", response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to store log" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on Port ${port}...`);
});
