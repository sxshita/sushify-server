const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000/',
    clientId: '791d855bdf4e4930a3584a4443cbe6f4',
    clientSecret: 'edee7d99f84445539b39bca30c09685c',
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      console.log(err)
    //   res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000/',
    clientId: '791d855bdf4e4930a3584a4443cbe6f4',
    clientSecret: 'edee7d99f84445539b39bca30c09685c'
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
    //   res.sendStatus(400)
    console.log(err)
    })
})

app.listen(3001);