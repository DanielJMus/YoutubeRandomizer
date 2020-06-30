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

    render () {
        const {videos} = this.props;
        if(videos) console.log(videos && videos.length > 0);
        return (
            <div className="video-player">
                { videos && this.UpdateVideoPlayer() }
                <div className="embed-responsive embed-responsive-16by9" id="player"></div>
            </div>
            
        );
    }

    SetVideoIndex (index)
    {
        const totalVideos = this.props.videos.length - 1;
        if(index > totalVideos)
        {
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
        };
      };

    onPlayerError(event) {
        switch (event.data) {
            case 2:
            break;
            case 100:
            break;
            case 101 || 150:
            break;
        };
    }
}

// Retrieve the redux state and add it to the component properties.
const mapStateToProps = (state) => {
    return {
        isFetchPending: state.isFetchPending,
        isFetchSuccess: state.isFetchSuccess,
        isFetchError: state.isFetchError,
        videos: state.videos,
        playlists: state.playlists
    };
}

export default connect(mapStateToProps)(VideoEmbed);