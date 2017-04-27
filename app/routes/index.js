'use strict';

const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
// const spotifyApi = require('../modules/spotify').spotifyApi;

const router = express.Router();

// TODO sacar esto a un modulo que no se porque no pude
const clientId = '79c1fdf6a43243378e995732c34deb22';
const clientSecret = '80da3e5874bf4673913a1475301011d7';

const spotify = new SpotifyWebApi({
  clientId,
  clientSecret,
});
spotify.clientCredentialsGrant()
  .then((data) => {
    console.log(`The access token expires in ${data.body.expires_in}`);
    console.log(`The access token is ${data.body.access_token}`);
    spotify.setAccessToken(data.body.access_token);
  }, (err) => {
    console.log('Something went wrong when retrieving an access token', err.message);
  });

// Ejemplo de traer un album probado con postman
router.get('/', (req, res) => {
  spotify.getAlbum('6xouXofc0TMYlttuaAFffW')
    .then((album) => {
      res.send(album);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/user/:uid/playlist/:pid', (req, res) => {
  const { uid, pid } = req.params
  spotify.getPlaylist(uid, pid)
    .then((album) => {
      res.send(album);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
