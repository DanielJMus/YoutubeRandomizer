import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchPlaylistInfo, fetchVideos, removePlaylist, setFetchError } from '../Actions/action';

class PlaylistEntry extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            videoDrawerOpen: -1
        }
        this.addPlaylist = this.addPlaylist.bind(this);
        this.removePlaylist = this.removePlaylist.bind(this);
    }

    addPlaylist = (e) => {
        e.preventDefault();
        let id = this.URL.value;
        if (id.includes("?list=")) {
            id = id.split("?list=")[1];
        }
        if(this.props.playlists.some(playlist => playlist.id === id)) {
            this.props.setFetchError("Playlist has already been added");
            return;
        }
        this.props.fetchPlaylistInfo(id).then(() => {
            this.props.fetchVideos(this.props.playlists);
        });
    }

    removePlaylist = (e) => {
        const index = e.target.getAttribute('index');
        this.props.removePlaylist(index).then(() => {
            if(this.props.playlists.length > 0) {
                this.props.fetchVideos(this.props.playlists);
            }
        });
    }

    toggleDrawer = (e) => {
        e.preventDefault();
        let index = parseInt(e.target.getAttribute('id'));
        if(this.state.videoDrawerOpen === index)
        {
            index = -1;
        }
        this.setState({videoDrawerOpen: index})
    }

    ListPlaylists () {
        const { videoDrawerOpen } = this.state;
        return this.props.playlists.map((item, i) => {
            var url = `https://www.youtube.com/playlist?list=${item.id}`;
            return (
                <div className="playlist-container" key={i}>
                    <div className="playlist-item">
                        <a className="playlist-title" href="#" id={i} onClick={this.toggleDrawer}>{item.title}</a>
                        <div className="playlist-remove" index={i} onClick={this.removePlaylist}>x</div>
                    </div>
                    <div className={`playlist-videos ${videoDrawerOpen === i ? "open" : ""}`}></div>
                </div>
            )
        });
    }

    render (){
        return (
            <div className="container">
                <h2>Enter a playlist URL</h2>
                <form onSubmit={this.addPlaylist}>
                    <input ref={(ref) => {this.URL = ref}} className="playlist-input" name="URL" type='text'/>
                    <input type="submit" value="Add"/>
                </form>
                <p style={{color:"red", fontWeight:"bold"}}>{this.props.isFetchError}</p>
                <p style={{color:"red", fontWeight:"bold"}}>{this.state.error}</p>
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
        removePlaylist: (id) => dispatch(removePlaylist(id)),
        setFetchError: (error) => dispatch(setFetchError(error))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistEntry);