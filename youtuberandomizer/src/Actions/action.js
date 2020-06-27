export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST';

export const addPlaylist = (url) => {
    // Get name of playlist from youtube API
    let name = "Playlist name";
    return {
        type: ADD_PLAYLIST,
        payload: {
            url: url, 
            name: name
        }
    }
}

export const removePlaylist = playlist => ({
    type: REMOVE_PLAYLIST,
    payload: playlist
});
