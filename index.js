var express = require('express')
var querystring = require('querystring')
var SpotifyWebApi = require('spotify-web-api-node')
var cookieParser = require('cookie-parser')
require('dotenv').config()

//express app
var app = express()
app.use(
    cookieParser()
)

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