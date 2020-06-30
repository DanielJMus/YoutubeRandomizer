import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchPlaylistInfo, fetchVideos, removePlaylist } from '../Actions/action';

class PlaylistEntry extends Component {

    constructor(props)
    {
        super(props);
        this.state = { error: undefined }
        this.addPlaylist = this.addPlaylist.bind(this);
        this.removePlaylist = this.removePlaylist.bind(this);
    }

    addPlaylist = (e) => {
        e.preventDefault();
        let id = this.URL.value;
        if (id.includes("?list=")) {
            id = id.split("?list=")[1];
        }
        this.setState({error: undefined});
        if(this.props.playlists.some(playlist => playlist.id === id)) {
            this.setState({error: "Playlist has already been added"});
            return;
        }
        this.props.fetchPlaylistInfo(id).then(() => {
            // this.props.fetchVideos(this.props.playlists);
        });
    }

    removePlaylist = (e) => {
        const index = e.target.getAttribute('index');
        this.props.removePlaylist(index).then(() => {
            // this.props.fetchVideos(this.props.playlists);
        });
    }

    ListPlaylists () {
        return this.props.playlists.map((item, i) => {
            var url = `https://www.youtube.com/playlist?list=${item.id}`;
            return (
                <div className="playlist-item" key={i}>
                    <a className="playlist-title" href={url}>{item.snippet.title}</a>
                    <div className="playlist-remove" index={i} onClick={this.removePlaylist}>x</div>
                </div>
            )
        });
    }

    render (){
        console.log(this.props.playlists);
        return (
            <div className="container">
                <h2>Enter a playlist URL</h2>
                <form onSubmit={this.addPlaylist}>
                    <input ref={(ref) => {this.URL = ref}} className="playlist-input" name="URL" type='text'/>
                    <input type="submit" value="Add"/>
                </form>
                {
                    this.props.isFetchError &&
                    <p style={{color:"red", fontWeight:"bold"}}>{this.props.isFetchError}</p>
                }
                {
                    this.state.error &&
                    <p style={{color:"red", fontWeight:"bold"}}>{this.state.error}</p>
                }
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
        fetchVideos: (url) => dispatch(fetchVideos(url)),
        removePlaylist: (id) => dispatch(removePlaylist(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEntry);