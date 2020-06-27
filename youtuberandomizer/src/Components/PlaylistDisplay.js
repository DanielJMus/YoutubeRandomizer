import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class PlaylistDisplay extends Component {

    ListPlaylists() {
        return this.props.playlists.map((item, i) => {
            return (<li key={i}>{item.name}</li>)
        });
    }

    render (){
        const {playlists} = this.props;
        return (
            <ul style={{listStyle:"none"}}>
                {this.ListPlaylists(playlists)}
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        playlists: state.playlists.playlists
    }
}

export default connect(mapStateToProps)(PlaylistDisplay);