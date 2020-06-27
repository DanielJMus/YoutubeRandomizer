import React, {Component} from 'react';
import {connect} from 'react-redux';
import YouTube from '../API/YouTube';

class PlaylistDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        }
    }

    ListPlaylists() {
        return this.props.playlists.map((item, i) => {
            return (<li key={i}>{item.name}</li>)
        });
    }

    ListVideos (){
        return this.state.data.items.map((item, i) => {
            var url = `http://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`;
            return (<a href={url}><li key={i}>{item.snippet.title}</li></a>)
        });
    }

    GetPlaylist = async (playlistID) => {
        const response = await YouTube.get('/playlistItems', {
            params: {
                playlistId: playlistID,
                part: 'snippet',
                maxResults: 50,
                key: process.env.REACT_APP_API_KEY
            }
        })
        console.log(response.data);
        this.setState({data: response.data});
    }

    componentDidMount () {
        this.GetPlaylist("PLI73u92BTHQDOOypO0Qn8aX1JgLOP2-nD");
    }

    render (){
        const {playlists} = this.props;
        const {data} = this.state;
        return (
            <ul style={{listStyle:"none"}}>
                {this.ListPlaylists(playlists)}
                {data && this.ListVideos()}
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playlists: state.playlists.playlists
    }
}

export default connect(mapStateToProps)(PlaylistDisplay);