import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchVideos } from '../Actions/action';

class VideoDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }

    ListVideos (){
        return this.props.videos.map((item, i) => {
            var url = `http://www.youtube.com/watch?v=${item.id}`;
            return (<a href={url} key={i}>{item.title}<br></br></a>)
        });
    }

    render (){
        return (
            <div className="video-container">
                {this.props.videos && this.props.videos.length > 0 &&
                <div className="video-list">
                    <h3>Current Videos:</h3>
                    {this.ListVideos()}
                </div>
                }
            </div>
        );
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVideos: (playlists) => dispatch(fetchVideos(playlists))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoDisplay);