import React, {Component} from 'react';
import {connect} from 'react-redux';
import { addPlaylist, fetchVideos } from '../Actions/action';

class PlaylistEntry extends Component {

    constructor(props)
    {
        super(props);
        this.state = { }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addPlaylist(this.state.url).then(() => {
            this.props.fetchVideos(this.props.playlists);
        });
    }

    render (){
        return (
            <div className="container">
                <h2>Enter a playlist URL</h2>
                <form onSubmit={this.handleSubmit}>
                    <input className="playlist-input" name="url" type='text' onChange={e => this.setState({url: e.target.value})}/>
                    <input type="submit" value="Submit"/>
                </form>
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
        addPlaylist: (url) => dispatch(addPlaylist(url)),
        fetchVideos: (url) => dispatch(fetchVideos(url))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEntry);