import React, { Component } from 'react';
import Utils from '../class/Utils';
import ValueSlider from './ValueSlider';
import ColorBoxContainer from './ColorBoxContainer';
import '../css/HsvControl.css';

class HsvControl extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      minHue: props.minHue || 0,
      maxHue: props.maxHue || 360,
      minSat: props.minSat || 0,
      maxSat: props.maxSat || 150,
      minVal: props.minVal || 0,
      maxVal: props.maxVal || 150,
      hueIndex: props.hueIndex || 150,
      hueSpread: props.hueSpread || 10
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentWillMount() {
    this.spreadHueIndex();
  }

  componentDidMount() {
    let values = this.getValues();
    this.props.onUpdate(values);
  }

  render() {
    let maxHue = this.getHueMax();
    let minHue = this.getHueMin();
    let midHue = this.getHueMid();
    let mappedMinVal = Utils.mapRange(this.state.minVal, 0, 255, 0, 1);
    let mappedMaxVal = Utils.mapRange(this.state.maxVal, 0, 255, 0, 1);

    return (
      <div className="sliderContainer">

        <div id="btns">
          <button onClick={this.handleSave}>Save</button>
          <button onClick={this.handleLoad}>Load</button>
        </div>

        <div className="clear"></div>

        <ValueSlider
          title = "Hue"
          id = "hueIndex"
          min = {0}
          max = {360}
          value = { this.state.hueIndex }
          onUpdate = { this.handleIndexChange.bind(this) }
          onComplete = { this.handleChangeComplete.bind(this) }
        />

        <ValueSlider
          title = "Range"
          id = "hueSpread"
          min = {0}
          max = {360}
          value = { this.state.hueSpread }
          onUpdate = { this.handleSpreadChange.bind(this) }
          onComplete = { this.handleChangeComplete.bind(this) }
        />

        <ValueSlider
          title = "Max Saturation"
          id = "maxSat"
          value = { this.state.maxSat }
          onUpdate = { this.handleValueChange.bind(this) }
          onComplete = { this.handleChangeComplete.bind(this) }
        />

        <ValueSlider
          title = "Min Saturation"
          id = "minSat"
          value = { this.state.minSat }
          onUpdate = { this.handleValueChange.bind(this) }
          onComplete = { this.handleChangeComplete.bind(this) }
        />

        <ValueSlider
          title = "Max Value"
          id = "maxVal"
          value = { this.state.maxVal }
          onUpdate = { this.handleValueChange.bind(this) }
          onComplete = { this.handleChangeComplete.bind(this) }
        />

        <ValueSlider
          title = "Min Value"
          id = "minVal"
          value = { this.state.minVal }
          onUpdate = { this.handleValueChange.bind(this) }
          onComplete = { this.handleChangeComplete.bind(this) }
        />

        <div className="clear"></div>

        <ColorBoxContainer
          maxHue = {maxHue}
          midHue = {midHue}
          minHue = {minHue}
          minVal = {mappedMinVal}
          maxVal = {mappedMaxVal}
        />

      </div>
      );
  }

  getValues() {
    let values = {
      maxHue: this.state.maxHue,
      minHue: this.state.minHue,
      maxSat: this.state.maxSat,
      minSat: this.state.minSat,
      maxVal: this.state.maxVal,
      minVal: this.state.minVal,
      hueIndex: this.state.hueIndex,
      hueSpread: this.state.hueSpread
    };
    return values;
  }

  setValues(values) {
    let hsvValues = {
      maxHue: values.maxHue,
      minHue: values.minHue,
      maxSat: values.maxSat,
      minSat: values.minSat,
      maxVal: values.maxVal,
      minVal: values.minVal,
      hueIndex: values.hueIndex,
      hueSpread: values.hueSpread
    };

    this.setState(hsvValues);
  }

  getHueMax() {
    let mappedH = Utils.mapRange(this.state.maxHue, 0, 360, 0, 1);
    let mappedS = Utils.mapRange(this.state.maxSat, 0, 255, 0, 1);
    let mappedV = Utils.mapRange(this.state.maxVal, 0, 255, 0, 1);
    return Utils.hsv2rgb(mappedH, mappedS, mappedV);
  }

  getHueMin() {
    let mappedH = Utils.mapRange(this.state.minHue, 0, 360, 0, 1);
    let mappedS = Utils.mapRange(this.state.maxSat, 0, 255, 0, 1);
    let mappedV = Utils.mapRange(this.state.maxVal, 0, 255, 0, 1);
    return Utils.hsv2rgb(mappedH, mappedS, mappedV);
  }

  getHueMid() {
    let mappedH = Utils.mapRange(this.state.hueIndex, 0, 360, 0, 1);
    let mappedS = Utils.mapRange(this.state.maxSat, 0, 255, 0, 1);
    let mappedV = Utils.mapRange(this.state.maxVal, 0, 255, 0, 1);
    return Utils.hsv2rgb(mappedH, mappedS, mappedV);
  }

  spreadHueIndex() {
    let index = this.state.hueIndex;
    let min = index - this.state.hueSpread;
    let max = index + this.state.hueSpread;
    this.setState({
      minHue: min < 0 ? 0:min,
      maxHue: max > 360 ? 360:max
    });
  }

  handleIndexChange(id, value) {
    this.setState({
      hueIndex: value
    });
    this.spreadHueIndex();
  }

  handleSpreadChange(id, value) {
    this.setState({
      hueSpread: (value > 0 && value < 360) ? value:10
    });
    this.handleIndexChange(null, this.state.hueIndex);
  }

  // Updates a specific slider-controlled value
  handleValueChange(field, value) {
    let data = {};
    data[field] = value;
    this.setState(data);
  }

  // When the slider-control stops, run parent's callback
  handleChangeComplete() {
    let values = this.getValues();
    this.props.onUpdate(values);
  }

  handleSave() {
    let values = this.getValues();
    values.hueIndex = this.state.hueIndex;
    values.hueSpread = this.state.hueSpread;
    localStorage.setItem('hsvBounds', JSON.stringify(values));
  }

  handleLoad() {
    let values = JSON.parse(localStorage.getItem('hsvBounds'));
    this.setValues(values);
    this.props.onDataLoad(values);
  }
}

export default HsvControl;
