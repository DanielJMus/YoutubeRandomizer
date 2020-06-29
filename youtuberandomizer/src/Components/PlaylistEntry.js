import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchPlaylistInfo, fetchVideos } from '../Actions/action';

class PlaylistEntry extends Component {

    constructor(props)
    {
        super(props);
        this.state = { }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.fetchPlaylistInfo(this.state.url).then(() => {
            this.props.fetchVideos(this.props.playlists);
        });
    }

    componentDidMount ()
    {
        // this.props.fetchVideos(this.props.playlists);
    }

    ListPlaylists () {
        return this.props.playlists.map((item, i) => {
            var url = `https://www.youtube.com/playlist?list=${item.id}`;
            return (
                <div className="playlist-item" key={i}>
                    <a className="playlist-title" href={url}>{item.snippet.title}<br></br></a>
                    <button className="playlist-remove">Remove</button>
                </div>
            )
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
                {
                    this.props.playlists.length > 0 &&
                    <div className="playlist-list">
                        <h2>Current Playlists</h2>
                        {this.ListPlaylists()}
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
        fetchPlaylistInfo: (url) => dispatch(fetchPlaylistInfo(url)),
        fetchVideos: (url) => dispatch(fetchVideos(url))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEntry);