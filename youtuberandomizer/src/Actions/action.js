import YouTube from '../API/YouTube';

export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SET_VIDEOS = 'SET_VIDEOS';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const SET_VIDEO = 'SET_VIDEO';
export const SET_FINISHEDLOADING = 'SET_FINISHEDLOADING';

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

export function setVideo (id, enabled) {
    return {
        type: SET_VIDEO,
        video: {
            id: id,
            enabled: enabled
        }
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

export function fetchPlaylistsInfo (playlists) {
    return dispatch => {
        return new Promise((resolve, reject) => {
        dispatch(setFetchPending(true));
        dispatch(setFetchSuccess(false));
        dispatch(setFetchError(null));
        let index = 0;
        for(var i = 0; i < playlists.length; i++)
        {
            sendPlaylistRequest(playlists[i])
            .then(playlist => {
                dispatch(addPlaylist(playlist));
                index++;
                if(index > playlists.length - 1) {
                    dispatch(setFetchPending(false));
                    dispatch(setFetchSuccess(true));
                    resolve();
                }
            })
            .catch(error => {
                dispatch(setFetchPending(false));
                dispatch(setFetchError(error));
                reject();
            })
        }
    });

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
        }).then(playlists => {
            if(playlists.data.items.length > 0) {
                // Prune variables
                const playlist = {
                    id: playlists.data.items[0].id,
                    title: playlists.data.items[0].snippet.title,
                }
                return resolve(playlist);
            }else
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

function getPaginatedPlaylist (firstPage, playlists, i, nextPageToken, videos) {
    if(!nextPageToken) {
        i++;
        if(i > playlists.length - 1) {
            // Videos have been successfully gathered, randomize the list and return it
            videos = videos.sort(() => Math.random() - 0.5);
            return new Promise(res => res(videos));
        } else {
            firstPage = true;
        }
    }

    let params = {
        playlistId: playlists[i].id,
        part: 'snippet',
        maxResults: 50,
        key: process.env.REACT_APP_API_KEY
    }

    return new Promise((res, rej) => {

        if(!firstPage) params.pageToken = nextPageToken;

        YouTube.get('/playlistItems', {
            params: params
        }).then(response => {
            const videolist = response.data.items.map(item => ({
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                playlistId: item.snippet.playlistId,
                enabled: (
                    item.snippet.title === "Private video" ||
                    item.snippet.title === "Deleted video") ? false : true
            }));
            videos = videos.concat(videolist);
            nextPageToken = response.data.nextPageToken;
            return res(getPaginatedPlaylist(false, playlists, i, nextPageToken, videos));
        }).catch(error => {
            console.log(error);
            return rej(error);
        })
    });
}