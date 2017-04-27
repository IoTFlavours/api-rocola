'use strict';

const http = require('http');
const express = require('express');
const metrics = require('express-node-metrics');

const app = express();

app.use(metrics.middleware);

app.get('/metrics', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(metrics.metrics.getAll(req.query.reset));
});

const server = http.createServer(app);

module.exports = { app, server };
