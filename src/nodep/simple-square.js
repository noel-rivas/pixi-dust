import * as PIXI from 'pixi.js';

class SimpleSquare {
  defaultOptions;
  options;
  rectangleObject;

  constructor(options) {
    this.defaultOptions = {
      sideLength: 100,
      color: 0xFFFFFF
    };

    this.options = {...this.defaultOptions, options};
    this.rectangleObject = new PIXI.Graphics();
    this.rectangleObject.beginFill(this.options.color);
    this.rectangleObject.drawRect(0, 0, this.options.sideLength, this.options.sideLength);
  }

  get container() {
    return this.rectangleObject;
  }

  static test() {
    return new SimpleSquare();
  }

  getTickFunction() {
    return null;
  }
}

export {
  SimpleSquare
}
