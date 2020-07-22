import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi()

const keyArr = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const keyMode = ['minor', 'major']

export const changeTokens = ({accessToken, refreshToken}) => {
    spotifyApi.setAccessToken(accessToken)
    spotifyApi.setRefreshToken(refreshToken)

    return{
        type: 'CHANGE_TOKEN',
        payload: {accessToken, refreshToken}
    }
}

export const changeColors = (newColorsArr) => {
    return {
        type: "CHANGE_COLORS",
        payload: {
            dominant: `rgb(${newColorsArr[0][0]}, ${newColorsArr[0][1]}, ${newColorsArr[0][2]})`,
            secondary: `rgb(${newColorsArr[1][0]}, ${newColorsArr[1][1]}, ${newColorsArr[1][2]})`
        }
    }
}

export const fetchCurrentSong = () => async dispatch => {
    try{

        const track = await spotifyApi.getMyCurrentPlaybackState()
        const {id, artists, name, album} = track.body.item

        const audioFeatures = await spotifyApi.getAudioFeaturesForTrack(id)
        const {key, tempo, mode} = audioFeatures.body

        let artistArr = []
        artists.forEach(artist => {artistArr.push(artist.name)})

        dispatch({type: "FETCH_SONG", payload: {
            id,
            name,
            artists: artistArr,
            albumArt: album.images[0].url,
            key: keyArr[key] + ' ' + keyMode[mode],
            bpm: Math.round(tempo),
            ugLink: "https://www.ultimate-guitar.com/search.php?search_type=title&value=" + encodeURIComponent(name + " " + artistArr[0])
        }})
    }
    catch(err) {
        if(err.statusCode === 401){
            const data = await fetch('api/refreshToken?refreshToken='+ spotifyApi.getRefreshToken())
            dispatch(changeTokens(data.data))
        }
        console.log(err)
    }
}