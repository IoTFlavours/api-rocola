'use strict';

const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
// const spotifyApi = require('../modules/spotify');

const router = express.Router();

// TODO sacar esto a un modulo que no se porque no pude
const clientId = '79c1fdf6a43243378e995732c34deb22';
const clientSecret = '80da3e5874bf4673913a1475301011d7';
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

module.exports = router;
