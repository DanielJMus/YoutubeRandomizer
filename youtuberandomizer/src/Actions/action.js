import axios from 'axios';
import YouTube from '../API/YouTube';

export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SET_VIDEOS = 'SET_VIDEOS';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';

export function setFetchPending (isFetchPending) {
    return {
        type: FETCH_PENDING,
        isFetchPending
    };
}

export function setFetchSuccess (isFetchSuccess) {
    return {
        type: FETCH_SUCCESS,
        isFetchSuccess
    };
}

export function setFetchError (isFetchError) {
    return {
        type: FETCH_ERROR,
        isFetchError
    };
}

export function setVideos (videos) {
    return {
        type: SET_VIDEOS,
        videos
    };
}

export function addPlaylist (url) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: ADD_PLAYLIST,
                url
            })
            resolve();
        });
    }
}

export function deletePlaylist (url) {
    return {
        type: DELETE_PLAYLIST,
        url
    };
}

export function fetchVideos (playlists) {
    return dispatch => {
        dispatch(setFetchPending(true));
        dispatch(setFetchSuccess(false));
        dispatch(setFetchError(null));
        dispatch(setVideos(null));

        sendPlaylistRequest(playlists)
            .then(videos => {
                dispatch(setFetchPending(false));
                dispatch(setFetchSuccess(true));
                dispatch(setVideos(videos));
            })
            .catch(error => {
                dispatch(setFetchPending(false));
                dispatch(setFetchError(error));
            })
    }
}

function sendPlaylistRequest (playlists) {
    return new Promise((resolve, reject) => {
        getPaginatedPlaylist(true, playlists, 0, "pageToken", []).then(videos => {
            return resolve(videos);
        }).catch(error => {
            return reject(error);
        })
    })
}

function getPaginatedPlaylist (first, playlists, i, nextPageToken, videos)
{

    // If nextPageToken is null, but we haven't gone through all playlists yet
        // Update URL to next playlist
        // Set 'first' to true

    console.log(nextPageToken + ", " +  i + ", " + playlists.length);

    if(!nextPageToken)
    {
        i++;
        if(i > playlists.length - 1)
        {
            return new Promise((res, rej) => res(videos));
        } else {
            first = true;
        }
    }

    // console.log(i);

    let url = playlists[i];

    let params = {
        playlistId: url,
        part: 'snippet',
        maxResults: 50,
        key: process.env.REACT_APP_API_KEY
    }

    // console.log(params);

    return new Promise((res, rej) => {

        if(!first) params.pageToken = nextPageToken;

        YouTube.get('/playlistItems', {
            params: params
        }).then(response => {
            videos = videos.concat(response.data.items);
            nextPageToken = response.data.nextPageToken;
            return res(getPaginatedPlaylist(false, playlists, i, nextPageToken, videos));
        }).catch(error => {
            return rej(error);
        })
    });
}