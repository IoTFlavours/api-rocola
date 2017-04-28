'use strict';

const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
// const spotifyApi = require('../modules/spotify');

const router = express.Router();

// TODO sacar esto a un modulo que no se porque no pude
const clientId = '30e1416683344493acfe11af2257e51c';
const clientSecret = '17ababd4c6d7474190a5a5730cb6832e';
const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
});


// Ejemplo de traer un album probado con postman
router.get('/', (req, res) => {
  spotifyApi.getAlbum('6xouXofc0TMYlttuaAFffW')
    .then((album) => {
      res.send(album);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Retrieve an access token
/* eslint-disable*/
router.get('/token', (req, res) => {
  spotifyApi.clientCredentialsGrant()
    .then((data) => {
      res.send(data.body['access_token']);
      // console.log('The access token expires in ' + data.body["expires_in"]);
      // console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
      console.log('Something went wrong when retrieving an access token', err.message);
    });
});

router.get('/playlist', (req, res) => {
  user();
  spotifyApi.getUserPlaylists('fliston22')
    .then((data) => {
      console.log('Retrieved playlists', data.body);
      res.send('Retrieved playlists' + data.body);
    }, function(err) {
      console.log('Something went wrong!', err);
    });
});

function user() {
  spotifyApi.clientCredentialsGrant()
    .then((data) => {
      res.send(data.body['access_token']);
      // console.log('The access token expires in ' + data.body["expires_in"]);
      console.log('The access token is ' + data.body['access_token']);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
      console.log('Something went wrong when retrieving an access token', err.message);
    });
}

module.exports = router;
