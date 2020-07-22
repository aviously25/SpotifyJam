import React from 'react'

export default function Header(props) {
    return(
        <div id='header' style={ { backgroundColor: props.bgColor }}>
            <h1><a href='/'>SpotifyJAM</a></h1>
        </div>
    )
}