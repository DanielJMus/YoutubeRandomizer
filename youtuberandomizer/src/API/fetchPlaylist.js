import {fetchPlaylistPending, fetchPlaylistSuccess, fetchPlaylistError} from '../Actions/action';
import YouTube from './YouTube';

function fetchPlaylist (playlistID) {
    return dispatch => {
        dispatch(fetchPlaylistPending());
        // Do API stuff, then dispatch success or error

        let name = "Playlist Name";
        let url = playlistID;
        let videos = "";

        let finished = false;

        let response = YouTube.get('/playlistItems', {
            params: {
                playlistId: playlistID,
                part: 'snippet',
                maxResults: 50,
                key: process.env.REACT_APP_API_KEY
            }
        }).then(function (res)
        {
            videos = response.items;
        
            let nextPageToken = response.nextPageToken;
            while (nextPageToken)
            {
                response = YouTube.get('/playlistItems', {
                    params: {
                        playlistId: playlistID,
                        part: 'snippet',
                        maxResults: 50,
                        pageToken: nextPageToken,
                        key: process.env.REACT_APP_API_KEY
                    }
                });
                nextPageToken = response.nextPageToken;
                videos = videos.concat(response.items);
            }
            dispatch(fetchPlaylistSuccess());
        });


    }
}

export default fetchPlaylist;