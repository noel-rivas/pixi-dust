import * as PIXI from 'pixi.js';
const TWEEN = require('@tweenjs/tween.js');
import { SimpleSquare } from './nodep/simple-square.js';
import { ColorSplit1 } from './sima/color-split1.js';

const classes = { 
  SimpleSquare,
  ColorSplit1
};

const appContainer = document.getElementsByClassName('demo')[0];
const app = new PIXI.Application({
  width: 640,
  height: 200,
  resizeTo: appContainer
});
appContainer.appendChild(app.view);
window.app = app;

// Add the tween update to the app ticker
app.ticker.add(() => {
  TWEEN.update()
})

function createDemosMenu() {
  // Get the menu container
  let menuContainer = document.getElementsByClassName('menu')[0];

  // Wipe it clean
  menuContainer.innerHTML = '';

  // Create ul element
  const ulElement = document.createElement('ul');
  menuContainer.appendChild(ulElement);

  // iterate demos, create an item and button for each of them
  for(let className in classes) {
    const liElement = document.createElement('li');
    liElement.innerHTML = `<button data-demo="${className}">${className}</button>`;
    liElement.addEventListener('click', doStuff);
    ulElement.appendChild(liElement);
  }
}

function doStuff(e) {
  // Get the class name
  const button = e.target;
  loadDemo(button.dataset.demo);

}

function loadDemo(name) {
  console.log(name);
  // If there's a child, do the Herodes thing.
  try {
    const onlyChild = app.stage.getChildAt(0);
    app.stage.removeChildAt(0);
    onlyChild.destroy();
    delete app.currentDemo;
  }
  catch(e) {
    console.log(e.message);
    // no children, no need to kill'em
  }

  const DemoClass = classes[name];
  app.currentDemo = DemoClass.test(); 
  const demoContainer = app.currentDemo.container;
  app.stage.addChild(demoContainer);

  // Add the demo ticker() function to the ticker
  app.ticker.add(app.currentDemo.getTickFunction());

  // Center the new member of the family
  const demoBounds = demoContainer.getBounds();

  demoContainer.x = app.renderer.width/2 - (demoBounds.width/2);
  demoContainer.y = app.renderer.height/2 - (demoBounds.height/2);
}

createDemosMenu();
