import React from 'react';
import './App.css';
import PlaylistEntry from './Components/PlaylistEntry'
import VideoDisplay from './Components/VideoDisplay'
import VideoEmbed from './Components/VideoEmbed';

function App() {
  return (
    <div className="App">
      <h1 className="title">A Better Youtube Shuffler</h1>
      <br></br>
      <PlaylistEntry/>
      <VideoEmbed/>
      <VideoDisplay/>
    </div>
  );
}

export default App;
