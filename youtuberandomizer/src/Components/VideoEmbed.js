import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setVideos} from '../Actions/action';

class VideoEmbed extends Component {
    constructor (props) {
        super(props);
        this.state = { index: 0, isPlayerReady: false };
        this.init();
        window['onYouTubeIframeAPIReady'] = (e) => {
            this.YT = window['YT'];
            this.player = new window['YT'].Player('player', {
                videoId: "5mGuCdlCcNM",
                events: {
                    'onStateChange': this.onPlayerStateChange.bind(this),
                    'onError': this.onPlayerError.bind(this),
                    'onReady': this.onPlayerReady
                }
            });
        };
    }

    onPlayerReady = (e) => {
        e.target.playVideo()
        this.setState({isPlayerReady: true});
        this.UpdatePlayer();
    }

    // CONTROLS
    Next = () => {
        this.SetVideoIndex(this.state.index + 1);
    }

    Previous = () => {
        this.SetVideoIndex(this.state.index - 1);
    }

    Shuffle = () => {
        this.props.setVideos(this.props.videos.sort(() => Math.random() - 0.5));
    }

    SetVideoIndex (index) {
        const totalVideos = this.props.videos.length - 1;
        if(index > totalVideos) {
            this.Shuffle();
            index = 0;
        }
        if(index < 0) {
            index = totalVideos;
        }
        this.setState({index: index});
    }

    init() {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    UpdatePlayer () {
        if(!this.state.isPlayerReady) return;
        if(this.player && this.props.videos && this.props.videos.length > 0) {
            if(!this.props.videos[this.state.index].enabled)
            {
                console.log("No");
                this.Next();
            }
            console.log(this.player);
            this.player.loadVideoById(this.props.videos[this.state.index].id);
        }
    }

    onPlayerStateChange (event) {
        switch (event.data) {
            case window['YT'].PlayerState.ENDED:
                this.SetVideoIndex(this.state.index + 1);
            break;
            default:
                break;
        };
    };

    onPlayerError (event) {
        this.SetVideoIndex(this.state.index + 1);
    }

    render () {
        const {videos} = this.props;
        return (
            <div className="video-player">
                { videos && this.UpdatePlayer() }
                <div className="video-controls">
                    <input onClick={this.Previous} className="video-control" type="button" value="< Previous"/>
                    <input onClick={this.Shuffle} className="video-control" type="button" value="Reshuffle"/>
                    <input onClick={this.Next} className="video-control" type="button" value="Next >"/>
                </div>
                
                <div className="embed-responsive embed-responsive-16by9" id="player"></div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setVideos: (videos) => dispatch(setVideos(videos))
    };
}

// Retrieve the redux state and add it to the component properties.
const mapStateToProps = (state) => {
    return {
        videos: state.videos,
        playlists: state.playlists
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoEmbed);