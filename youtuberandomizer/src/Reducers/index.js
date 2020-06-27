import {combineReducers} from 'redux';
import PlaylistReducer from './reducer-playlists';
import VideosReducer from './reducer-videos';

const allReducers = combineReducers({
    playlists: PlaylistReducer,
    videos: VideosReducer
});

export default allReducers;