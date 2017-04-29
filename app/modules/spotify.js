'use strict';

const SpotifyWebApi = require('spotify-web-api-node');

function spotifyApi() {
  const clientId = '79c1fdf6a43243378e995732c34deb22';
  const clientSecret = '80da3e5874bf4673913a1475301011d7';
  const redirectUri = 'http://localhost:8081/auth/spotify/callback';
  const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];

  const spotify = new SpotifyWebApi({
    clientId,
    clientSecret,
    redirectUri,
  });

  const authorizeURL = spotify.createAuthorizeURL(scopes);
  console.log('--------------------------- COPY HERE authorizeURL-------------------------------');
  console.log(authorizeURL);
  console.log('--------------------------- COPY HERE authorizeURL-------------------------------');
  console.log(spotify);
  return spotify;
}
// No se pq lo exporta vacio
module.export = { spotifyApi: spotifyApi() };
