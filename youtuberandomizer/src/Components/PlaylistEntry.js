import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addPlaylist} from '../Actions/action';

class PlaylistEntry extends Component {

    constructor(props)
    {
        super(props);
        this.state = { }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addPlaylist(this.state.url);
    }

    render (){
        return (
            <div className="container">
                <h2>Enter a playlist URL</h2>
                <form onSubmit={this.handleSubmit}>
                    <input className="playlist-input" name="url" type='text' onChange={e => this.setState({url: e.target.value})}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({addPlaylist: addPlaylist}, dispatch)
}

export default connect(null, mapDispatchToProps)(PlaylistEntry);