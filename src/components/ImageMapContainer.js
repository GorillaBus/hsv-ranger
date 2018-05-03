import React, { Component } from 'react';
import ImageMap from './ImageMap';
import '../css/ImageMap.css';

class ImageMapContainer extends Component {
  constructor() {
    super();
    this.imRefs = [];
  }

  render() {
    return(
      <ul id="imageMapList">
      {
        this.props.images.map((img, i) => {
          let src = this.props.dir + img.src;
          return (
            <li key={i}>
              <ImageMap
                ref={ m => { this.imRefs.push(m); }}
                src={ src }
                hsvBounds={ this.props.hsvBounds }
              />
            </li>);
        })
      }
      </ul>
    );
  }

}

export default ImageMapContainer;
