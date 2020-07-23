import React from 'react'
import ColorThief from 'color-thief'
import { connect } from 'react-redux'

import '../style.scss';
import { changeColors, fetchCurrentSong} from '../actions'

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.imgRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchCurrentSong()
        setInterval(this.props.fetchCurrentSong, 1000)
    }

    handleImgLoad = async () => {
        const colorThief = new ColorThief()
        const colorsArr = await colorThief.getPalette(this.imgRef.current, 2)
        this.props.changeColors(colorsArr)
    }
    
    render(){
        const {name, artists=[], key, bpm, ugLink, albumArt} = this.props.currentSong

        return(
            <div id="main">
                <div className="left-div">
                    <img src={albumArt} alt="Album Art" ref={this.imgRef} onLoad={this.handleImgLoad} crossOrigin="anonymous"/>
                    <h1> {name} </h1>
                    <p className="artists"> {artists.join(', ')} </p>
                </div>
                
                <div className="right-div">
                    <div className="info-section">
                        <h1>{key}</h1>
                        <span>Key</span>
                    </div>
                    <div className="info-section">
                        <h1>{bpm}</h1>
                        <span>BPM</span>
                    </div>
                    <br />
                    <br />
                    <a href={ugLink} target='_blank' rel="noopener noreferrer">
                        <button type='button' className="ugLink"> Ultimate Guitar </button>
                    </a>
                    <button type='button' onClick={() => this.props.fetchCurrentSong()} style={{backgroundColor: this.props.colors.secondary}}>Check Now Playing</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentSong: state.currentSong,
        colors: state.colors
    }
}

const mapDispatchToProps = { fetchCurrentSong, changeColors }

export default connect(mapStateToProps, mapDispatchToProps)(Main)

