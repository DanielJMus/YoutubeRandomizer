import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchVideos } from '../Actions/action';

class PlaylistDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }

    ListVideos (){
        return this.props.videos.map((item, i) => {
            var url = `http://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`;
            return (<a href={url} key={i}>{item.snippet.title}<br></br></a>)
        });
    }

    render (){
        const {playlists} = this.props;
        const {data} = this.state;
        return (
            <div className="video-list">
                {this.props.videos && this.ListVideos()}
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDisplay);