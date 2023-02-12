import * as PIXI from 'pixi.js';

class ColorSplit1 {
  texture;
  container;
  width;
  height;

  constructor(texture, width=null, height=null) {
    this.texture = texture;

    this.container = new PIXI.Container();

    const red = new PIXI.Sprite(texture);
    red.tint = 0xFF2288;
    this.configureSprite(red);
    
    const green = new PIXI.Sprite(texture);
    green.tint = 0x00DD00;
    this.configureSprite(green);

    const blue = new PIXI.Sprite(texture);
    blue.tint = 0x000088;
    this.configureSprite(blue);

    this.container.addChild(red);
    this.container.addChild(green);
    this.container.addChild(blue);

    this.addClickDisruptor();
    this.addNormalizer();
  }

  configureSprite(sprite) {
    sprite.blendMode = PIXI.BLEND_MODES.ADD;

    sprite.blurFilter = new PIXI.BlurFilter()
    sprite.filters = [sprite.blurFilter]
    sprite.blurFilter.blendMode = PIXI.BLEND_MODES.ADD
    sprite.blurFilterAmount = 30
    sprite.blurFilter.blur = .000001
  }

  addClickDisruptor() {
    if(this.disruptors_added) {
      return false;
    }
    
    this.container.interactive = true;
    this.container.on('mousedown', this.clicked);

    this.disruptors_added = true;
  }

  clicked() {
    let children = this.children;

    children.forEach(channel => {
      channel.pos_x = Math.round(Math.random() * 30) - 15;
      channel.pos_y = Math.round(Math.random() * 50) - 25

      channel.x = channel.pos_x
      channel.y = channel.pos_y

      channel.blurFilter.blur = channel.blurFilterAmount

      channel.alpha = 0
    })
  }

  addNormalizer() {
    app.ticker.add(() => {
      let children = this.container.children;
      let speed_pos = 0.05
      let speed_blur = 0.09

      children.forEach(channel => {
        channel.x += (0 - channel.x) * speed_pos;
        channel.y += (0 - channel.y) * speed_pos;

        let blur = channel.blurFilter
        blur.blur += (0 - channel.blurFilter.blur) * speed_blur

        channel.alpha += (1 - channel.alpha) * speed_blur
      });
    });
  }

  get container() {
    return this.container;
  }

  static test() {
    const texture = PIXI.Texture.from('https://upload.wikimedia.org/wikipedia/commons/b/b9/Diatomeas-Haeckel.jpg');
    return new ColorSplit1(texture);
  }
}

export {
  ColorSplit1,
}
