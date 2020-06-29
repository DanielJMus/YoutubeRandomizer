import React, {Component} from 'react';
import {connect} from 'react-redux';

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
            return (<a href={url}><li key={i}>{item.snippet.title}</li></a>)
        });
    }

    render (){
        const {playlists} = this.props;
        const {data} = this.state;
        return (
            <ul style={{listStyle:"none"}}>
                {this.props.videos && this.ListVideos()}
            </ul>
        );
    }
}

// Retrieve the redux state and add it to the component properties.
const mapStateToProps = (state) => {
    return {
        isFetchPending: state.isFetchPending,
        isFetchSuccess: state.isFetchSuccess,
        isFetchError: state.isFetchError,
        videos: state.videos
    };
}

export default connect(mapStateToProps)(PlaylistDisplay);