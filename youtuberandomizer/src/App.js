import React from 'react';
import logo from './logo.svg';
import './App.css';
import PlaylistDisplay from './Components/PlaylistDisplay'
import PlaylistEntry from './Components/PlaylistEntry'

function App() {
  return (
    <div className="App">
      <h1>A Better Youtube Shuffler</h1>
      <br></br>
      <PlaylistEntry/>
      <h3>Current Playlists:</h3>
      <PlaylistDisplay/>
    </div>
  );
}

export default App;
