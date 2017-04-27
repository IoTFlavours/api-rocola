'use strict';

const SpotifyWebApi = require('spotify-web-api-node');

const clientId = '79c1fdf6a43243378e995732c34deb22';
const clientSecret = '80da3e5874bf4673913a1475301011d7';

function spotifyApi() {
  const spotify = new SpotifyWebApi({
    clientId,
    clientSecret,
  });
  spotify.clientCredentialsGrant()
    .then((data) => {
      console.log(`The access token expires in ${data.body.expires_in}`);
      console.log(`The access token expires in ${data.body.access_token}`);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body.access_token);
      return spotifyApi;
    }, (err) => {
      console.log('Something went wrong when retrieving an access token', err.message);
    });

  return spotify;
}

// No se pq lo exporta vacio
module.export = { spotifyApi };
