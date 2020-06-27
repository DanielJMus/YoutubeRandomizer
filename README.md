A simple web app created to practice using React and Redux.

## What

YouTube's playlist shuffling functionality is abysmal, often repeating the same videos again and again and not playing others a single time. This React app aims to solve this by retrieving the videos from the playlist using YouTube API V3, and shuffling the resulting list manually. The app will then play through the shuffled list one by one until it has been played through completely before shuffling once again, rather than picking a new random video each time like YouTube seems to.

The app comes with the added benefit of allowing for multiple playlists to be added, meaning you can shuffle many playlists at once into one large, non-repeating list.

## To Do

- [ ] Playlist Adding, Retrieving, and Shuffling
- [ ] Implement YouTube embed with end-state detection
- [ ] Allow disabling of specific videos

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.