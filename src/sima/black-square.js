import * as PIXI from 'pixi.js';

class BlackSquare {
  sideLength;
  rectangleObject;

  constructor(length = 100) {
    this.sideLength = length; 
    this.rectangleObject = new PIXI.Graphics();
    this.rectangleObject.beginFill(0xFFFFFF);
    this.rectangleObject.drawRect(0, 0, this.sideLength, this.sideLength);
  }

  get container() {
    return this.rectangleObject;
  }

  static test() {
    return new BlackSquare();
  }
}

export {
  BlackSquare
}
