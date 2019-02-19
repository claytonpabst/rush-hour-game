import React, { Component } from 'react';
import {TrafficState} from './TrafficState.js';
import PuzzlesWrapper from './components/PuzzlesWrapper/PuzzlesWrapper.js';

import './App.css';
import './reset.css';

class App extends Component {
  render() {
    return (
      <TrafficState>
        <div className="App">
          <PuzzlesWrapper/>
        </div>
      </TrafficState>
    );
  }
}

export default App;
