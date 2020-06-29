import axios from 'axios';
import YouTube from '../API/YouTube';

export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SET_VIDEOS = 'SET_VIDEOS';

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

export function fetchVideos (url) {
    return dispatch => {
        dispatch(setFetchPending(true));
        dispatch(setFetchSuccess(false));
        dispatch(setFetchError(null));
        dispatch(setVideos(null));

        sendPlaylistRequest(url)
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

function sendPlaylistRequest (url) {
    return new Promise((resolve, reject) => {
        getPaginatedPlaylist(true, url, "pageToken", []).then(videos => {
            console.log(videos);
            return resolve(videos);
        }).catch(error => {
            return reject(error);
        })
    })
}

function getPaginatedPlaylist (first, url, nextPageToken, videos)
{
    if(!nextPageToken) {
        console.log("Finished");
        return new Promise((res, rej) => res(videos));
    }

    let params = {
        playlistId: url,
        part: 'snippet',
        maxResults: 50,
        key: process.env.REACT_APP_API_KEY
    }

    return new Promise((res, rej) => {
        if(!first) params.pageToken = nextPageToken;

        YouTube.get('/playlistItems', {
            params: params
        }).then(response => {
            videos = videos.concat(response.data.items);
            nextPageToken = response.data.nextPageToken;
            return res(getPaginatedPlaylist(false, url, nextPageToken, videos));
        }).catch(error => {
            return rej(error);
        })
    });
}