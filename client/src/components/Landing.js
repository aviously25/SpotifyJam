import React from 'react'
import '../style.scss';

export default class Landing extends React.Component {
    render() {
        return (
            <div id="landing">
                <div className="login-button" >
                    <a href='/api/login'>
                        <button type="button" className="login" onClick={this.handleClick}><img src="spotify.png" alt="spotify logo" />Login to Spotify </button>
                    </a>
                </div>
            </div>
        )
    }
}