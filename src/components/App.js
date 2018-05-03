import React, { Component } from 'react';

import images from '../images.json';
import HsvControl from './HsvControl';
import ImageMapContainer from './ImageMapContainer';

const IMAGE_DIR = "/img/";

class App extends Component {
  constructor() {
    super();

    this.state = {
      hsvBounds: null
    };

    this.HsvControlRef = null;

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  render() {
    return (
      <div className="App">

        <ImageMapContainer
          dir = { IMAGE_DIR }
          images = { images }
          hsvBounds = { this.state.hsvBounds }
        />

        <HsvControl
          ref = { m => { this.HsvControlRef = m; }}
          onUpdate = { this.handleUpdate }
          onDataLoad = { this.handleUpdate }
        />

      </div>
    );
  }

  handleUpdate(controlValues) {
    if (!controlValues) {
      return;
    }
    let hsvBounds = {
      maxHue: controlValues.maxHue / 360,
      minHue: controlValues.minHue / 360,
      maxSat: controlValues.maxSat / 255,
      minSat: controlValues.minSat / 255,
      maxVal: controlValues.maxVal / 255,
      minVal: controlValues.minVal / 255
    };
    this.setState({
      hsvBounds: hsvBounds
    });
  }
}

export default App;
