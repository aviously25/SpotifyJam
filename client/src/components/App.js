import React, { Component } from 'react'
import querystring from 'querystring'
import { connect } from 'react-redux'
import { changeTokens } from '../actions'

import '../style.scss';
import Main from './Main';
import Landing from './Landing'
import Header from './Header'
import Footer from './Footer' 

class App extends Component {
    componentDidMount() {
        this.props.changeTokens(querystring.parse(window.location.hash.substring(1)))
        
    }

    render() {
        return (
            <div className="App" style={{ backgroundColor: `${this.props.colors.dominant}`}}>
                <Header bgColor={this.props.colors.secondary}/>
                {!this.props.credentials.accessToken && <Landing /> }
                {this.props.credentials.accessToken && <Main />}
                {/* <Footer /> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        credentials: state.credentials,
        colors: state.colors
    }
}

const mapDispatchToProps = { changeTokens}

export default connect(mapStateToProps, mapDispatchToProps)(App)
