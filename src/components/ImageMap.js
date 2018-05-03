import React, { Component } from 'react';
import Utils from '../class/Utils';

class ImageMap extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loaded: false,
      hide: false
    };

    this.width = null;
    this.height = null;
    this.imageCanvas = null;
    this.imageCtx = null;
    this.mapCanvas = null;
    this.mapCtx = null;

    this.handleHideMap = this.handleHideMap.bind(this);
  }

  componentWillMount() {
    this.id = this.idFromFileSrc();
  }

  componentDidMount() {
    this.initCanvas();
    this.loadImage();
  }

  componentDidUpdate() {
    this.tint();
  }

  render() {
    let holderStyle = { width: this.width, height: this.height };
    let btnText = "Hide map";
    let btnStyle = { visibility: 'visible' };
    if (this.state.hide === true) {
      btnText = "Show map";
      btnStyle = { visibility: 'hidden' };
    }

    return (
      <div id={this.id} className="canvasHolder" style={ holderStyle }>
        <canvas className="canvas"></canvas>
        <canvas className="hsvMap" style={btnStyle}></canvas>
        <button className="btnHide" onClick={this.handleHideMap}>{btnText}</button>
      </div>
    )
  }

  loadImage() {
    let img = new Image();
    img.onload = () => {
      this.setDimensions(img.naturalWidth, img.naturalHeight);
      this.imageCtx.drawImage(img, 0, 0);
      this.setState({
        loaded: true
      });
    };
    img.src = this.props.src;
  }

  setDimensions(width, height) {
    this.imageCanvas.width = this.mapCanvas.width = width;
    this.imageCanvas.height  = this.mapCanvas.height = height;
    this.width = width;
    this.height = height;
  }

  idFromFileSrc() {
    return this.props.src.replace(/[<>:"\/\\|?*]+/g, '');
  }

  initCanvas() {
    let container = document.getElementById(this.id);
    this.imageCanvas = container.childNodes[0];
    this.mapCanvas = container.childNodes[1];
    this.imageCtx = this.imageCanvas.getContext("2d");
    this.mapCtx = this.mapCanvas.getContext("2d");
  }

  tint() {
    if (!this.props.hsvBounds || !this.state.loaded) {
      return false;
    }

    let imgData = this.imageCtx.getImageData(0, 0, this.width,  this.height);
    let data = imgData.data;
    let total = data.length;
    for (let i=0; i<total; i+=4) {
      let hsv = Utils.rgb2hsv(data[i], data[i+1], data[i+2]);
      let qualifies = this.classify(hsv);
      if (qualifies) {
        data[i] = 255;
        data[i+1] = 0;
        data[i+2] = 0;
        data[i+3] = 255;
      }
    }
    this.mapCtx.putImageData(imgData, 0, 0);
  }

  classify(hsv) {
    let rules = this.props.hsvBounds;
    let h = hsv[0] >= rules.minHue && hsv[0] <= rules.maxHue;
    let s = hsv[1] >= rules.minSat && hsv[1] <= rules.maxSat;
    let v = hsv[2] >= rules.minVal && hsv[2] <= rules.maxVal;
    return h && s && v;
  }

  handleHideMap(e) {
    this.setState({
      hide: !this.state.hide
    });
  }

}

export default ImageMap;
