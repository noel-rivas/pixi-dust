import * as PIXI from 'pixi.js';

class ColorSplit1 {
  default_options;
  options;

  texture;
  container;

  constructor(texture, options) {
    this.default_options = {
      width: null,
      height: null,
      position_speed: 0.05,
      blur_speed: 0.09,
      disrupt_on_click: true,
      blur_filter_amount: 30,
      displacement_x: 40,
      displacement_y: 50,
    }

    this.options = {...this.default_options, ...options};

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

    if(this.options.disrupt_on_click) {
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

    sprite.blur_filter = new PIXI.BlurFilter()
    sprite.filters = [sprite.blur_filter]
    sprite.blur_filter.blendMode = PIXI.BLEND_MODES.ADD
    sprite.blur_filter_amount = this.options.blur_filter_amount;
    sprite.blur_filter.blur = .000001
  }

  addClickDisruptor() {
    if(this.disruptors_added) {
      return false;
    }
    
    this.container.interactive = true;
    this.container.on('mousedown', () => {this.disrupt();});

    this.disruptors_added = true;
  }


  disrupt() {
    let children = this.container.children;

    for(const channel of children) {
      channel.pos_x = Math.round(Math.random() * this.options.displacement_x) - (this.options.displacement_x / 2);
      channel.pos_y = Math.round(Math.random() * this.options.displacement_y) - (this.options.displacement_y / 2);

      channel.x = channel.pos_x
      channel.y = channel.pos_y

      channel.blur_filter.blur = channel.blur_filter_amount
    }
  }

  getTickFunction() {
    const tick_function = () => {
      let children = this.container.children;
      let speed_pos = this.options.position_speed;
      let speed_blur = this.options.blur_speed;

      children.forEach(channel => {
        channel.x += (0 - channel.x) * speed_pos;
        channel.y += (0 - channel.y) * speed_pos;

        let blur = channel.blur_filter
        blur.blur += (0 - channel.blur_filter.blur) * speed_blur

        channel.alpha += (1 - channel.alpha) * speed_blur
      });
    };

    return tick_function;
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
