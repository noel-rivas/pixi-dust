import * as PIXI from 'pixi.js';

/**
 * Takes a texture and splits it in RGB channels that can be manipulated
 * separately. Includes a "disrupt" effect to move and blur the channels.
 */
class ColorSplit1 {
  defaultOptions;
  options;

  texture;
  container;

  constructor(texture, options) {
    this.defaultOptions = {
      width: null,      // the size of the object will be that of the texture, once it loads
      height: null,
      positionSpeed: 0.05,
      blurSpeed: 0.09,
      disruptOnClick: true,
      blurFilterAmount: 30,
      displacementX: 40,
      displacementY: 50,
    }

    this.options = {...this.defaultOptions, ...options};

    this.texture = texture;

    this.container = new PIXI.Container();

    const red = new PIXI.Sprite(texture);
    red.name = 'red';
    red.tint = 0xFF2288;
    this.configureSprite(red);
    
    const green = new PIXI.Sprite(texture);
    green.name = 'green';
    green.tint = 0x00DD00;
    this.configureSprite(green);

    const blue = new PIXI.Sprite(texture);
    blue.name = 'blue';
    blue.tint = 0x000088;
    this.configureSprite(blue);

    this.container.addChild(red);
    this.container.addChild(green);
    this.container.addChild(blue);

    if(this.options.disruptOnClick) {
      this.addClickDisruptor();
    }
  }

  configureSprite(sprite) {
    sprite.blendMode = PIXI.BLEND_MODES.ADD;

    if(this.options.width) {
      sprite.width = this.options.width;
    }

    if(this.options.height) {
      sprite.height = this.options.height;
    }

    sprite.blurFilter = new PIXI.BlurFilter()
    sprite.filters = [sprite.blurFilter]
    sprite.blurFilter.blendMode = PIXI.BLEND_MODES.ADD
    sprite.blurFilterAmount = this.options.blurFilterAmount;
    sprite.blurFilter.blur = .000001
  }

  addClickDisruptor() {
    if(this.disruptorsAdded) {
      return false;
    }
    
    this.container.interactive = true;
    this.container.on('mousedown', () => {this.disrupt();});

    this.disruptorsAdded = true;
  }


  disrupt() {
    let children = this.container.children;

    for(const channel of children) {
      channel.posX = Math.round(Math.random() * this.options.displacementX) - (this.options.displacementX / 2);
      channel.posY = Math.round(Math.random() * this.options.displacementY) - (this.options.displacementY / 2);

      channel.x = channel.posX
      channel.y = channel.posY

      channel.blurFilter.blur = channel.blurFilterAmount
    }
  }

  getTickFunction() {
    const tickFunction = () => {
      this.container.children.forEach(channel => {
        channel.x += (0 - channel.x) * this.options.positionSpeed;
        channel.y += (0 - channel.y) * this.options.blurSpeed;

        let blur = channel.blurFilter
        blur.blur += (0 - channel.blurFilter.blur) * this.options.blurSpeed
      });
    };

    return tickFunction;
  }

  get container() {
    return this.container;
  }

  static test() {
    const texture = PIXI.Texture.from('https://upload.wikimedia.org/wikipedia/commons/b/b9/Diatomeas-Haeckel.jpg');
    return new ColorSplit1(texture, {
      width: 200,
      height: 133
    });
  }
}

export {
  ColorSplit1,
}
