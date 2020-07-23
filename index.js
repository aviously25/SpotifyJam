var express = require('express')
var querystring = require('querystring')
var SpotifyWebApi = require('spotify-web-api-node')
var cookieParser = require('cookie-parser')
var cors = require('cors')
require('dotenv').config()

//express app
var app = express()
app.use(
    cors(),
    cookieParser()
)

//EXPIRED ACCESS TOKEN: BQCrHsUNUNdE3mCNo1ITNx1ulPuFR8BaUxMC7leL39yJ3t23auDM4jTi3DQwpsBNrUKDZNDJNPvzxursjjVlPYs3oFo6f6PETf4aylQxKlrKsQi6VyYMep4dmSIoeJV1WintJztnbA_6xmlbA7K_SL3CVv-ZjX9c
//EXPIRED REFRESH TOKEN: AQBFl3gKkyRfAPWUnmPKhjRDFHXWj7xPQ0tyvD0CiqjePAQGw5UhSx-CKggRDRoguSK8xj4LMuxcNyYfExU9TPgkl-G8hph2UPFr1LzRXZ2jaaPIOnMxBhJ1PYF5svwgT64


//spotify api node setup
var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI
})

//login route
app.get('/api/login', (req,res)=> {
    var scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state']
    var authorizeUrl = spotifyApi.createAuthorizeURL(scopes)
    res.redirect(authorizeUrl)
})

//calback route
app.get('/callback', (req,res) => {
    var code = req.query.code

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.redirect( process.env.CLIENT_HOST + '#' + querystring.stringify({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token
        }))
    })
    .catch(
        err => console.log(err)
    )
})

//refresh token route
app.get('/api/refreshToken', (req,res) => {
    var refreshToken = req.query.refreshToken
    spotifyApi.setRefreshToken(refreshToken)

    spotifyApi.refreshAccessToken().then(data => {
        res.send(data.body)
    })
})

//listen on port
app.listen(process.env.PORT, () => {
    console.log('Server listening')
})