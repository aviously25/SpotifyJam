import React from 'react'
import '../style.scss';

export default class Landing extends React.Component {
    render(){
        return(
            <div id="landing">
                <a href='/api/login'>
                    <button type="button" className="login" onClick={this.handleClick}>Login to Spotify </button>
                </a>
            </div>
        )
    }
}