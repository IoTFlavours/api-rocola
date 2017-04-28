'use strict';

const SpotifyWebApi = require('spotify-web-api-node');

const http = require('http');
const express = require('express');
const metrics = require('express-node-metrics');

const app = express();

const spotifyApi = new SpotifyWebApi({
  clientId: '30e1416683344493acfe11af2257e51c',
  clientSecret: '17ababd4c6d7474190a5a5730cb6832e',
});

// Retrieve an access token
/* eslint-disable*/
// spotifyApi.clientCredentialsGrant()
//   .then((data) => {
//     console.log('The access token expires in ' + data.body["expires_in"]);
//     console.log('The access token is ' + data.body['access_token']);
//
//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
//   }, function(err) {
//     console.log('Something went wrong when retrieving an access token', err.message);
//   });

app.use(metrics.middleware);

app.get('/metrics', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(metrics.metrics.getAll(req.query.reset));
});
const server = http.createServer(app);

module.exports = {
  app,
  server
};
