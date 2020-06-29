import { FETCH_PENDING, FETCH_SUCCESS, FETCH_ERROR, SET_VIDEOS } from '../Actions/action';

export default function reducer (state = {
    isFetchPending: false,
    isFetchSuccess: false,
    isFetchError: null,
    videos: null
}, action) {
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

        default:
            return state;
    }
}