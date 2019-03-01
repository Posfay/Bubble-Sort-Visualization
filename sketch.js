const LENGTH = 80;
const SPEED = 1;    //update per frames

let LINE_WIDTH;
let LINE_HEIGHT_STEP;

let arr = new Array(LENGTH);
let arrCopy = new Array(LENGTH);
let rendezve = false;
let actionsB = [];
let actionsJ = [];
let btn;
let cnv;




function setup() {
  cnv = createCanvas(800, 400);
  cnv.mousePressed(mousePrsd);
  frameRate(60);

  createP("Click to sort with Bubble Sort");
  btn = createButton("Reset");
  btn.mousePressed(btnPressed);

  LINE_WIDTH = width / LENGTH;
  LINE_HEIGHT_STEP = height / LENGTH;

  for (let i = 0; i < LENGTH; i++) {
    arr[i] = floor(random() * LENGTH);
    arrCopy[i] = arr[i];
  }
}

function draw() {
  background (0);

  for (let i = 0; i < LENGTH; i++) {
    fill(255, 255, 0);
    stroke(255, 255, 0);
    strokeWeight(0);
    rect(i * LINE_WIDTH, height - (arrCopy[i] * LINE_HEIGHT_STEP), LINE_WIDTH, arrCopy[i] * LINE_HEIGHT_STEP);
  }

  if (rendezve && frameCount % SPEED == 0) {
    nextStep();
  }
}

function mousePrsd() {
  if (!rendezve) {
    bubbleSort();
    rendezve = true;
  }
}

function btnPressed() {
  rendezve = false;
  actionsB = [];
  actionsJ = [];

  for (let i = 0; i < LENGTH; i++) {
    arr[i] = floor(random() * LENGTH);
    arrCopy[i] = arr[i];
  }
}




function csere(array, egyik, masik) {
  let tmp = array[egyik];
  array[egyik] = array[masik];
  array[masik] = tmp;
}

function tarol(b, j) {
  actionsB.push(b);
  actionsJ.push(j);
}

function bubbleSort() {
  let done = false;
  while (!done) {
    done = true;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i-1] > arr[i]) {
        csere(arr, i-1, i);
        tarol(i-1, i);
        done = false;
      }
    }
  }
}

function nextStep() {
  let bal = actionsB.shift();
  let jobb = actionsJ.shift();
  csere(arrCopy, bal, jobb);
}
