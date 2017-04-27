'use strict';

const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '79c1fdf6a43243378e995732c34deb22';
const clientSecret = '80da3e5874bf4673913a1475301011d7';

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
});

// No se pq lo exporta vacio
module.export = spotifyApi;
