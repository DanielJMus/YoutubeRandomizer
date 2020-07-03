import { FETCH_PENDING, FETCH_SUCCESS, FETCH_ERROR, SET_VIDEOS, ADD_PLAYLIST, DELETE_PLAYLIST, SET_VIDEO, SET_FINISHEDLOADING } from '../Actions/action';

const InitialState = {
    isFetchPending: false,
    isFetchSuccess: false,
    isFetchError: null,
    isFinishedLoading: false,
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
        case SET_FINISHEDLOADING:
            return {
                ...state,
                isFinishedLoading: action.isFinishedLoading
            }
        case SET_VIDEOS:
            return {
                ...state,
                videos: action.videos
            };
        case ADD_PLAYLIST:
            return {
                ...state,
                playlists: [...state.playlists, action.playlist]
            };
        case DELETE_PLAYLIST:
            return {
                playlists: [
                    ...state.playlists.filter((item, index) => index !== action.index)
                ]
            };
        case SET_VIDEO:
            return {
                ...state,
                videos: state.videos.map(video => video.id === action.video.id ?
                    { ...video, enabled: action.video.enabled } :
                    video 
                )
            };

        default:
            return state;
    }
}