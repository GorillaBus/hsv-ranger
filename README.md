A simple, rusty yet very handy application to analize how pixels are grouped in a bitmap by their HSV (Hue/Saturation/Value) values.

Originally created to define H-S-V ranges that will fit with objects in satellite map imagery, to aid
object recognition procedures.


## Main dependencies

React ^16.3.2
React-Rangeslider ^2.2.0

Built using [create-react-app](https://www.npmjs.com/package/create-react-app)


## How to use it

1. Run 'npm install'
2. Copy some images to 'public/img'
3. Edit 'src/images.json' and register the images
4. Run 'npm start' for development or 'npm build' if you like an optimized version.
5. Use the sliders to find the Hue index, expand/contract the Hue Range, define min/max Saturation and values
6. Use 'Save' / 'Load' to save and recall the slider's state
