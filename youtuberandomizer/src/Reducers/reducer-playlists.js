
const initialState = {
    playlists: [{
        id: "PLI73u92BTHQDOOypO0Qn8aX1JgLOP2-nD",
        name: "Soundtracks for Working"
    },
    {
        id: "PLI73u92BTHQC5tzss8MgKkZm8mWV5s7SU",
        name: "Old Albums"
    },
    {
        id: "PLI73u92BTHQAmJKNAyPkq9uVXByj_RXAm",
        name: "Older Music"
    },
    {
        id: "PLI73u92BTHQBJ-eTx_XKjZ_ASTAyDm0yI",
        name: "Music"
    },
    {
        id: "PLI73u92BTHQDSvTNQvMoCEP36DDwqobXI",
        name: "Disney"
    },
    {
        id: "PLI73u92BTHQCcZdavBNpvd_bv68p9DRwG",
        name: "Jack Stauber"
    }]
};

const playlistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PLAYLIST":
            return {
                ...state,
                playlists: [...state.playlists, action.payload]
            };
        case "DELETE_PLAYLIST":
            return {
                playlists: [
                    ...state.playlists.filter(playlist => playlist !== action.payload)
                ]
            };
        default:
            return state;
    }
};


export default playlistsReducer;