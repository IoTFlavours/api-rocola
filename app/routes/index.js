'use strict';

const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const request = require('request');

const router = express.Router();

// TODO arreglar lo del module!
const clientId = '79c1fdf6a43243378e995732c34deb22';
const clientSecret = '80da3e5874bf4673913a1475301011d7';
const redirectUri = 'http://localhost:8081/auth/spotify/callback';
const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private', 'user-read-currently-playing'];

const spotify = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
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

// GET PLAYLIST - already tested with postman
// TODO get user playlist
router.get('/user/:uid/playlist/:pid', (req, res) => {
  const { uid, pid } = req.params;
  spotify.getPlaylist(uid, pid)
    .then((playlist) => {
      res.json(playlist.body.tracks.items);
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET USER PLAYLUSTS - already tested with postman
// TODO get playlist id, is in uri. not in .id maybe?
router.get('/user/:uid/playlists', (req, res) => {
  const { uid } = req.params;
  spotify.getUserPlaylists(uid)
    .then((playlists) => {
      res.json(playlists.body.items);
    })
    .catch((err) => {
      console.log(err);
    });
});

// ADD TRACK
// TODO add track playlist - already tested with postman
router.get('/user/:uid/playlist/:pid/addtrack/:tid', (req, res) => {
  const { uid, pid, tid } = req.params;
  spotify.addTracksToPlaylist(uid, pid, [`spotify:track:${tid}`])
    .then((done) => {
      res.json(done);
    })
    .catch((err) => {
      console.log(err);
    });
});

// ADD TRACK IN POSITION - already tested with postman
router.get('/user/:uid/playlist/:pid/addtrack/:tid/position/:p', (req, res) => {
  const { uid, pid, tid, p } = req.params;
  spotify.addTracksToPlaylist(uid, pid, [`spotify:track:${tid}`], { position: p })
    .then((done) => {
      res.json(done);
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET CURRENT PLAYNING SONG -- tested with postman
// TODO with uid get in the database the access token to put in the headers
router.get('/user/:uid/currentSong/:token', (req, res) => {
  const { uid, token } = req.params;
  console.log(uid);
  const currentSongRequest = { url: 'https://api.spotify.com/v1/me/player/currently-playing', headers: { Authorization: `Bearer ${token}` } };
  request(currentSongRequest, (error, response) => {
    console.log('error:', error); // Print the error if one occurred
    res.json(response);
  });
});

// SPOTIFY AUTHENTIFICATION
router.get('/auth/spotify', (req, res) => {
  console.log('hola');
  const authorizeURL = spotify.createAuthorizeURL(scopes);
  console.log(authorizeURL);
  res.send(authorizeURL);
});

// SPOTIFY CALLBACK
router.get('/auth/spotify/callback', (req, res) => {
  console.log(req.query.code);
  const code = req.query.code;
  spotify.authorizationCodeGrant(code)
    .then((response) => {
      console.log(`The access token expires in ${response.body.expires_in}`);
      console.log(`The access token is ${response.body.access_token}`);
      spotify.setAccessToken(response.body.access_token);
      spotify.getMe()
        .then((profile) => {
          console.log('--------------------------- COPY HERE user_id-------------------------------');
          console.log(`The user id ${profile.body.id}`);
          console.log('--------------------------- COPY HERE user_idL-------------------------------');
          // TODO add data base, and create on the go playlis
          res.send('login correcto');
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
