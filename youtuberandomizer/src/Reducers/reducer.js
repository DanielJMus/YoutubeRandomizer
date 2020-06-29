import { FETCH_PENDING, FETCH_SUCCESS, FETCH_ERROR, SET_VIDEOS, ADD_PLAYLIST, DELETE_PLAYLIST } from '../Actions/action';

const InitialState = {
    isFetchPending: false,
    isFetchSuccess: false,
    isFetchError: null,
    playlists: [],
    videos: []
};

export default (state = InitialState, action) => {
    switch(action.type) {
        case FETCH_SUCCESS:
            return {
                ...state,
                isFetchSuccess: action.isFetchSuccess
            };
        case FETCH_PENDING:
            return {
                ...state,
                isFetchPending: action.isFetchPending
            };
        case FETCH_ERROR:
            return {
                ...state,
                isFetchError: action.isFetchError
            }
        case SET_VIDEOS:
            return {
                ...state,
                videos: action.videos
            };
        case ADD_PLAYLIST:
            return {
                ...state,
                playlists: [...state.playlists, action.url]
            };
        case DELETE_PLAYLIST:
            return {
                playlists: [
                    ...state.playlists.filter(url => url !== action.url)
                ]
            };

        default:
            return state;
    }
}