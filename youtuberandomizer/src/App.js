import React from 'react';
import './App.css';
import PlaylistEntry from './Components/PlaylistEntry'
import VideoDisplay from './Components/VideoDisplay'

function App() {
  return (
    <div className="App">
      <h1>A Better Youtube Shuffler</h1>
      <br></br>
      <PlaylistEntry/>
      <h3>Current Videos:</h3>
      <VideoDisplay/>
    </div>
  );
}

export default App;
