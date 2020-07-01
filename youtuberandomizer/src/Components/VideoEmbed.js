import React, {Component} from 'react';
import {connect} from 'react-redux';

class VideoEmbed extends Component {
    constructor (props) {
        super(props);

        this.state = { index: 0 };

        this.init();

        window['onYouTubeIframeAPIReady'] = (e) => {
            this.YT = window['YT'];
            this.reframed = false;
            this.player = new window['YT'].Player('player', {
                videoId: this.video,
                events: {
                    'onStateChange': this.onPlayerStateChange.bind(this),
                    'onError': this.onPlayerError.bind(this),
                    'onReady': (e) => {
                        e.target.playVideo();
                    }
                }
            });
        };
    }

    // CONTROLS
    Next = () => {
        this.SetVideoIndex(this.state.index + 1);
    }

    Previous = () => {
        this.SetVideoIndex(this.state.index - 1);
    }

    Shuffle = () => {
        // this.SetVideoIndex(this.state.index - 1);
    }

    render () {
        const {videos} = this.props;
        return (
            <div className="video-player">
                { videos && this.UpdateVideoPlayer() }
                <div className="video-controls">
                    <input onClick={this.Previous} className="video-control left" type="button" value="< Previous"/>
                    <input onClick={this.Shuffle} className="video-control" type="button" value="Reshuffle"/>
                    <input onClick={this.Next} className="video-control right" type="button" value="Next >"/>
                </div>
                
                <div className="embed-responsive embed-responsive-16by9" id="player"></div>
            </div>
            
        );
    }

    SetVideoIndex (index)
    {
        const totalVideos = this.props.videos.length - 1;
        if(index > totalVideos)
        {
            // Reshuffle
            index = 0;
        }
        if(index < 0)
        {
            index = totalVideos;
        }
        this.setState({index: index});
    }

    UpdateVideoPlayer ()
    {
        if(this.player && this.props.videos.length > 0) {
            this.player.loadVideoById(this.props.videos[this.state.index].id);
        }
    }

    init() {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    onPlayerStateChange(event) {
        switch (event.data) {
            case window['YT'].PlayerState.ENDED:
                this.SetVideoIndex(this.state.index + 1);
            break;
            default:
                break;
        };
    };

    onPlayerError(event) {
        this.SetVideoIndex(this.state.index + 1);
    }
}

// Retrieve the redux state and add it to the component properties.
const mapStateToProps = (state) => {
    return {
        videos: (state.videos) ? state.videos.filter(x => x.enabled) : state.videos,
        playlists: state.playlists
    };
}

export default connect(mapStateToProps)(VideoEmbed);