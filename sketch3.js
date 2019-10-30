let cubeside = 40;
let colors;
let myCube;
let tempCube;
let animating = false;
let identity = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
]

let twistX = [
  [1, 0, 0],
  [0, 0, -1],
  [0, 1, 0]
]

let twistXXX = [
  [1, 0, 0],
  [0, 0, 1],
  [0, -1, 0]
]

let twistY = [
  [0, 0, -1],
  [0, 1, 0],
  [1, 0, 0]
]

let twistYYY = [
  [0, 0, 1],
  [0, 1, 0],
  [-1, 0, 0]
]

let twistZ = [
  [0, -1, 0],
  [1, 0, 0],
  [0, 0, 1]
]

let twistZZZ = [
  [0, 1, 0],
  [-1, 0, 0],
  [0, 0, 1]
]




let testQB;
let testColorSet;
let seqOfTwist = [
  //plane, depth, sense

];

let counter = 0;
let steps = 0;

function setup() {
  createCanvas(800, 400, WEBGL);
  normalMaterial();
  cam = createCamera();
  //debugMode();
  colors = [
    color(183, 18, 52), //red
    color(0, 155, 72), //green
    color(255, 255, 255), //white
    color(255, 88, 0), //orange
    color(0, 70, 173), //blue
    color(255, 213, 0) //yellow
  ]
  myCube = [
    [
      [],
      [],
      []
    ],
    [
      [],
      [],
      []
    ],
    [
      [],
      [],
      []
    ]
  ];
  tempCube = [
    [
      [],
      [],
      []
    ],
    [
      [],
      [],
      []
    ],
    [
      [],
      [],
      []
    ]
  ];
  initializeCube();
  for (let i = 0; i < 25; i++){
    let Q = randomMoveMaker();
    seqOfTwist.push(Q[0]);
    seqOfTwist.unshift(Q[1]);
  }
}

function draw() {
  background(100);
  ambientLight(255);
  orbitControl();
  stroke(0);
  if (!animating || counter == seqOfTwist.length) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          myCube[i][j][k].display();
        }
      }
    }
  } else {
    animateMove(seqOfTwist[counter][0], seqOfTwist[counter][1], seqOfTwist[counter][2]);
    steps++;
    if (steps == 100) {
      animating = false;
      twist(seqOfTwist[counter][0], seqOfTwist[counter][1], seqOfTwist[counter][2]);
      counter++;
      steps = 0;
      if (counter < seqOfTwist.length) {
        animating = true;
      }
    }
  }
}

function keyTyped() {
  animating = !animating;
  if (counter >= seqOfTwist.length){
    seqOfTwist = [];
    for (let i = 0; i < 25; i++){
      let Q = randomMoveMaker();
      seqOfTwist.push(Q[0]);
      seqOfTwist.unshift(Q[1]);
    }
    counter = 0;
  }
}

function initializeCube() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        myCube[i][j][k] = new QB([
          [i - 1],
          [j - 1],
          [k - 1]
        ], identity, colorSetMaker(colors, [
          [i - 1],
          [j - 1],
          [k - 1]
        ]));

        tempCube[i][j][k] = new QB([
          [i - 1],
          [j - 1],
          [k - 1]
        ], identity, colorSetMaker(colors, [
          [i - 1],
          [j - 1],
          [k - 1]
        ]));
      }
    }
  }
  return
}

//plane is 'x', 'y', 'z'
//depth is -1, 0, 1
//sense is 1 , -1
function twist(plane, depth, sense) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if (plane == 'x') {
          if (sense == 1) {
            if (myCube[i][j][k].posColVec[0] == depth) {
              myCube[i][j][k].orientationMatrix = multiplyMatrices(twistX, myCube[i][j][k].orientationMatrix);
              myCube[i][j][k].posColVec = multiplyMatrices(twistX, myCube[i][j][k].posColVec);
              //  tempCube[i][j][k].orientationMatrix = multiplyMatrices(twistX, myCube[i][j][k].orientationMatrix);
              //  tempCube[i][j][k].posColVec = multiplyMatrices(twistX, myCube[i][j][k].posColVec);
            }
          } else if (sense == -1) {
            if (myCube[i][j][k].posColVec[0] == depth) {
              myCube[i][j][k].orientationMatrix = multiplyMatrices(twistXXX, myCube[i][j][k].orientationMatrix);
              myCube[i][j][k].posColVec = multiplyMatrices(twistXXX, myCube[i][j][k].posColVec);
              //  tempCube[i][j][k].orientationMatrix = multiplyMatrices(twistXXX, myCube[i][j][k].orientationMatrix);
              //  tempCube[i][j][k].posColVec = multiplyMatrices(twistXXX, myCube[i][j][k].posColVec);
            }
          }
        } else if (plane == 'y') {
          if (sense == 1) {
            if (myCube[i][j][k].posColVec[1] == depth) {
              myCube[i][j][k].orientationMatrix = multiplyMatrices(twistY, myCube[i][j][k].orientationMatrix);
              myCube[i][j][k].posColVec = multiplyMatrices(twistY, myCube[i][j][k].posColVec);
              //  tempCube[i][j][k].orientationMatrix = multiplyMatrices(twistY, myCube[i][j][k].orientationMatrix);
              //  tempCube[i][j][k].posColVec = multiplyMatrices(twistY, myCube[i][j][k].posColVec);
            }
          } else if (sense == -1) {
            if (myCube[i][j][k].posColVec[1] == depth) {
              myCube[i][j][k].orientationMatrix = multiplyMatrices(twistYYY, myCube[i][j][k].orientationMatrix);
              myCube[i][j][k].posColVec = multiplyMatrices(twistYYY, myCube[i][j][k].posColVec);
              //  tempCube[i][j][k].orientationMatrix = multiplyMatrices(twistYYY, myCube[i][j][k].orientationMatrix);
              //  tempCube[i][j][k].posColVec = multiplyMatrices(twistYYY, myCube[i][j][k].posColVec);
            }
          }

        } else if (plane == 'z') {
          if (sense == 1) {
            if (myCube[i][j][k].posColVec[2] == depth) {
              myCube[i][j][k].orientationMatrix = multiplyMatrices(twistZ, myCube[i][j][k].orientationMatrix);
              myCube[i][j][k].posColVec = multiplyMatrices(twistZ, myCube[i][j][k].posColVec);
              ///  tempCube[i][j][k].orientationMatrix = multiplyMatrices(twistZ, myCube[i][j][k].orientationMatrix);
              //  tempCube[i][j][k].posColVec = multiplyMatrices(twistZ, myCube[i][j][k].posColVec);
            }
          } else if (sense == -1) {
            if (myCube[i][j][k].posColVec[2] == depth) {
              myCube[i][j][k].orientationMatrix = multiplyMatrices(twistZZZ, myCube[i][j][k].orientationMatrix);
              myCube[i][j][k].posColVec = multiplyMatrices(twistZZZ, myCube[i][j][k].posColVec);
              //  tempCube[i][j][k].orientationMatrix = multiplyMatrices(twistZZZ, myCube[i][j][k].orientationMatrix);
              ///    tempCube[i][j][k].posColVec = multiplyMatrices(twistZZZ, myCube[i][j][k].posColVec);
            }
          }
        }
      }

    }
  }
}

function multiplyMatrices(m1, m2) {
  var result = [];
  for (var i = 0; i < m1.length; i++) {
    result[i] = [];
    for (var j = 0; j < m2[0].length; j++) {
      var sum = 0;
      for (var k = 0; k < m1[0].length; k++) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function QB(posColVec, orientationMatrix, colorSet) {
  this.posColVec = posColVec;
  this.orientationMatrix = orientationMatrix;
  this.colorSet = colorSet;
}

QB.prototype.display = function() {

  push();
  translate(-this.posColVec[0] * cubeside, -this.posColVec[1] * cubeside, -this.posColVec[2] * cubeside);
  appMat(this.orientationMatrix);
  if (this.colorSet.x) {
    fill(this.colorSet.x);
    quad(cubeside / 2, cubeside / 2, cubeside / 2,
      cubeside / 2, -cubeside / 2, cubeside / 2,
      cubeside / 2, -cubeside / 2, -cubeside / 2,
      cubeside / 2, cubeside / 2, -cubeside / 2);
    quad(-cubeside / 2, cubeside / 2, cubeside / 2,
      -cubeside / 2, -cubeside / 2, cubeside / 2,
      -cubeside / 2, -cubeside / 2, -cubeside / 2,
      -cubeside / 2, cubeside / 2, -cubeside / 2);
  }
  if (this.colorSet.y) {
    fill(this.colorSet.y);
    quad(cubeside / 2, cubeside / 2, cubeside / 2,
      cubeside / 2, cubeside / 2, -cubeside / 2,
      -cubeside / 2, cubeside / 2, -cubeside / 2,
      -cubeside / 2, cubeside / 2, cubeside / 2);
    quad(cubeside / 2, -cubeside / 2, cubeside / 2,
      cubeside / 2, -cubeside / 2, -cubeside / 2,
      -cubeside / 2, -cubeside / 2, -cubeside / 2,
      -cubeside / 2, -cubeside / 2, cubeside / 2);

  }
  if (this.colorSet.z) {
    fill(this.colorSet.z);
    quad(cubeside / 2, cubeside / 2, cubeside / 2,
      -cubeside / 2, cubeside / 2, cubeside / 2,
      -cubeside / 2, -cubeside / 2, cubeside / 2,
      cubeside / 2, -cubeside / 2, cubeside / 2);
    quad(cubeside / 2, cubeside / 2, -cubeside / 2,
      -cubeside / 2, cubeside / 2, -cubeside / 2,
      -cubeside / 2, -cubeside / 2, -cubeside / 2,
      cubeside / 2, -cubeside / 2, -cubeside / 2);
  }
  pop();
  return;
}

function appMat(M) {
  applyMatrix(M[0][0], M[1][0], M[2][0], 0.0,
    M[0][1], M[1][1], M[2][1], 0.0,
    M[0][2], M[1][2], M[2][2], 0.0,
    0.0, 0.0, 0.0, 1.0);
  return;
}

function colorSetMaker(colors, colVect) {
  let appropriateColorSet = {
    x: color(0),
    y: color(0),
    z: color(0)
  }

  if (colVect[0] == -1) {
    appropriateColorSet.x = colors[0];
  }
  if (colVect[0] == 1) {
    appropriateColorSet.x = colors[1];
  }
  if (colVect[1] == -1) {
    appropriateColorSet.y = colors[2];
  }
  if (colVect[1] == 1) {
    appropriateColorSet.y = colors[3];
  }
  if (colVect[2] == -1) {
    appropriateColorSet.z = colors[4];
  }
  if (colVect[2] == 1) {
    appropriateColorSet.z = colors[5];
  }
  return appropriateColorSet;

}

function animateMove(plane, depth, sense) {
  let theta = PI / 200;

  let animateTwistX = [
    [1, 0, 0],
    [0, cos(theta), -sin(theta)],
    [0, sin(theta), cos(theta)]
  ];
  let animateTwistXXX = [
    [1, 0, 0],
    [0, cos(theta), sin(theta)],
    [0, -sin(theta), cos(theta)]
  ];
  let animateTwistY = [
    [cos(theta), 0, -sin(theta)],
    [0, 1, 0],
    [sin(theta), 0, cos(theta)]
  ];
  let animateTwistYYY = [
    [cos(theta), 0, sin(theta)],
    [0, 1, 0],
    [-sin(theta), 0, cos(theta)]
  ];
  let animateTwistZ = [
    [cos(theta), -sin(theta), 0],
    [sin(theta), cos(theta), 0],
    [0, 0, 1]
  ];
  let animateTwistZZZ = [
    [cos(theta), sin(theta), 0],
    [-sin(theta), cos(theta), 0],
    [0, 0, 1]
  ];


  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        tempCube[i][j][k].display();
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if (plane == 'x') {
          if (sense == 1) {
            if (myCube[i][j][k].posColVec[0] == depth) {
              tempCube[i][j][k].orientationMatrix = multiplyMatrices(animateTwistX, tempCube[i][j][k].orientationMatrix);
              tempCube[i][j][k].posColVec = multiplyMatrices(animateTwistX, tempCube[i][j][k].posColVec);
            }
          } else if (sense == -1) {
            if (myCube[i][j][k].posColVec[0] == depth) {
              tempCube[i][j][k].orientationMatrix = multiplyMatrices(animateTwistXXX, tempCube[i][j][k].orientationMatrix);
              tempCube[i][j][k].posColVec = multiplyMatrices(animateTwistXXX, tempCube[i][j][k].posColVec);
            }
          }
        } else if (plane == 'y') {
          if (sense == 1) {
            if (myCube[i][j][k].posColVec[1] == depth) {
              tempCube[i][j][k].orientationMatrix = multiplyMatrices(animateTwistY, tempCube[i][j][k].orientationMatrix);
              tempCube[i][j][k].posColVec = multiplyMatrices(animateTwistY, tempCube[i][j][k].posColVec);
            }
          } else if (sense == -1) {
            if (myCube[i][j][k].posColVec[1] == depth) {
              tempCube[i][j][k].orientationMatrix = multiplyMatrices(animateTwistYYY, tempCube[i][j][k].orientationMatrix);
              tempCube[i][j][k].posColVec = multiplyMatrices(animateTwistYYY, tempCube[i][j][k].posColVec);
            }
          }

        } else if (plane == 'z') {
          if (sense == 1) {

            if (myCube[i][j][k].posColVec[2] == depth) {
              tempCube[i][j][k].orientationMatrix = multiplyMatrices(animateTwistZ, tempCube[i][j][k].orientationMatrix);
              tempCube[i][j][k].posColVec = multiplyMatrices(animateTwistZ, tempCube[i][j][k].posColVec);
            }
          } else if (sense == -1) {
            if (myCube[i][j][k].posColVec[2] == depth) {
              tempCube[i][j][k].orientationMatrix = multiplyMatrices(animateTwistZZZ, tempCube[i][j][k].orientationMatrix);
              tempCube[i][j][k].posColVec = multiplyMatrices(animateTwistZZZ, tempCube[i][j][k].posColVec);
            }
          }
        }
      }
    }
  }
}

function randomMoveMaker(){
  let a = Math.random();
  let b = Math.random();
  let c = Math.random();

  if (a < .34){
    a = 'x';
  } else if (a < .67){
    a = 'y';
  } else {
    a = 'z';
  }

  if (b < .5){
    b = -1;
  } else {
    b = 1;
  }

  if (c < .5){
    c = -1;
  } else {
    c = 1;
  }
  return [[a, b, c], [a, b, -c]]
}
