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

export function addPlaylist (playlist) {
    return {
        type: ADD_PLAYLIST,
        playlist
    }
}

export function removePlaylist (index) {
    index = parseInt(index);
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: DELETE_PLAYLIST,
                index
            })
            resolve();
        })
    }
}

export function fetchPlaylistInfo (playlistId) {
    return dispatch => {
        return new Promise((resolve, reject) => {
        dispatch(setFetchPending(true));
        dispatch(setFetchSuccess(false));
        dispatch(setFetchError(null));

        sendPlaylistRequest(playlistId)
            .then(playlist => {
                dispatch(setFetchPending(false));
                dispatch(setFetchSuccess(true));
                dispatch(addPlaylist(playlist));
                resolve();
            })
            .catch(error => {
                dispatch(setFetchPending(false));
                dispatch(setFetchError(error));
            })
        });
    }
}

export function sendPlaylistRequest (playlistId) {
    return new Promise((resolve, reject) => {
        YouTube.get('/playlists', {
            params: {
                id: playlistId,
                part: 'snippet',
                key: process.env.REACT_APP_API_KEY
            }
        }).then(playlist => {
            if(playlist.data.items.length > 0)
                return resolve(playlist.data.items[0]);
            else
                return reject("Playlist does not exist or may be private.");
        })
        .catch(error => {
            console.log(error);
            return reject(error);
        })
    })
}

export function fetchVideos (playlists) {
    return dispatch => {
        dispatch(setFetchPending(true));
        dispatch(setFetchSuccess(false));
        dispatch(setFetchError(null));
        dispatch(setVideos(null));

        sendPlaylistVideosRequest(playlists)
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

function sendPlaylistVideosRequest (playlists) {
    return new Promise((resolve, reject) => {
        getPaginatedPlaylist(true, playlists, 0, "pageToken", []).then(videos => {
            return resolve(videos);
        }).catch(error => {
            console.log(error);
            return reject(error);
        })
    })
}

function getPaginatedPlaylist (first, playlists, i, nextPageToken, videos) {
    if(!nextPageToken) {
        i++;
        if(i > playlists.length - 1) {
            // Videos have been successfully gathered, randomize the list and return it
            videos = videos.sort(() => Math.random() - 0.5);
            return new Promise(res => res(videos));
        } else {
            first = true;
        }
    }

    let params = {
        playlistId: playlists[i].id,
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
            return res(getPaginatedPlaylist(false, playlists, i, nextPageToken, videos));
        }).catch(error => {
            console.log(error);
            return rej(error);
        })
    });
}