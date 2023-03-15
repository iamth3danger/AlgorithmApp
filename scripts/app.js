const canvas = document.getElementById('canvas');

let weightBtn = document.getElementById('weight-btn');
let dijBtn = document.getElementById('dij-btn');
let bfsBtn = document.getElementById('bfs-btn');
let mazeBtn = document.getElementById('maze-btn');
let randomPointsBtn = document.getElementById('startend-btn');
let clearBtn = document.getElementById('clear-btn');
let startBtn = document.getElementById('start-btn');
let context = canvas.getContext('2d');

let width =  window.innerWidth;
let height = .85 * window.innerHeight;

function setCanvas(canvas){
    canvas.width = width;
    canvas.height = height;
}

setCanvas(canvas);
context.fillStyle = "#0e334a";
context.fillRect(0, 0, width, height);


function findGridDimensions(canvasSize){
    gridSize = Math.floor(canvasSize / 25);
    
    if (gridSize % 2 === 0) {
        gridSize--;
        return (gridSize * 25);
    }
    else return (gridSize * 25);
}

let gridWidth = findGridDimensions(width);
//sizes.width;
let gridHeight = findGridDimensions(height);
//sizes.height;

// function drawGrid(length, width){
//     if (length / width !== 5 / 3) return;

//     for (let i = 0; i <= (length / 25); i++){
//         context.beginPath();
//         context.moveTo((25 * i) + 50, 100);
//         context.lineWidth = "1";
//         context.strokeStyle = "#42f5e6";
//         context.lineTo((25 * i) + 50, (width + 100));
//         context.stroke();
//     }

//     for (let i = 0; i <= (width / 25); i++){
//         context.beginPath();
//         context.moveTo(50, (25 * i) + 100);
//         context.lineWidth = "1";
//         context.strokeStyle = "#42f5e6";
//         context.lineTo((length + 50), (25 * i) + 100);
//         context.stroke();
//     }
// }

// context.fillStyle = "#0bfc03";
// context.fillRect(xTransform(3), yTransform(3), 24, 24);
// context.fillStyle = "#915BFF";

// context.fillRect(xTransform(21), yTransform(8), 24, 24);

function drawGrid(length, width){
    //if (length / width !== 5 / 3) return;

    for (let i = 0; i <= (length / 25); i++){
        context.beginPath();
        context.moveTo((25 * i), 0);
        context.lineWidth = "1";
        context.strokeStyle = "#42f5e6";
        context.lineTo((25 * i), (width));
        context.stroke();
    }

    for (let i = 0; i <= (width / 25); i++){
        context.beginPath();
        context.moveTo(0, (25 * i));
        context.lineWidth = "1";
        context.strokeStyle = "#42f5e6";
        context.lineTo((length), (25 * i));
        context.stroke();
    }
}

drawGrid(gridWidth, gridHeight);

const toString = grid => grid.map(row => row.join(" ")).join("\n");
const randInt = end => Math.floor(Math.random() * end);



const gridReset = () => {
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++){
            grid[i][j] = '.';
        }
    }
};
// context.fillStyle = "#000000";
// context.fillRect(xTransform(0), yTransform(0), 24, 24);
context.fillStyle = "#000000";
let mazeImage = [];
function mazeHandler(grid, click){
if (weightBtn.value === 'On') return;
mazeBtn.value = 'On';
if (click === 1){
    let mid = createGrid((grid.length), (grid[0].length));

    for (let i = 0; i < mid.length; i++){
        for (let j = 0; j < mid[0].length; j++){
                if (mid[i][j] === '#'){
                        grid[i][j] = mid[i][j];
                        animate(i, j, [255, 255, 255], [0, 0, 0]);
                    }
        }
    }

}
else {
    context.putImageData(ogGrid, 0, 0);
    gridReset();
    mid = createGrid((grid.length), (grid[0].length));
    console.log(grid);
    for (let i = 0; i < mid.length; i++){
        for (let j = 0; j < mid[0].length; j++){
                if (mid[i][j] === '#'){
                        grid[i][j] = mid[i][j];
                        animate(i, j, [255, 255, 255], [0, 0, 0]);
                    }
        }
    }

}
setTimeout(function(){
    let image = context.getImageData(0, 0, canvas.width, canvas.height);
    mazeImage.push(image);
},
1000);

}
let pixelData = colorValues(context);


let grid = gridMaker(pixelData, (gridHeight / 25), (gridWidth / 25));


function getStartEnd(grid){
    let arr = [];
    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[0].length; c++){
            if (grid[r][c] === 'S') {
                arr[0] = (c) + ((grid[0].length) * r) + 1;
            }
            if (grid[r][c] === 'E') {
                arr[1] = (c) + ((grid[0].length) * r) + 1;
            }
    }
    return arr;
}


function bfsHandler(grid){
    if (weightBtn.value === 'On' || dijBtn.value === 'On') return;
    if (mazeBtn.value !== 'On' && refreshArr.length > 0){
        let last = refreshArr.length - 1;
        context.putImageData(refreshArr[last], 0, 0);
    }
    else if(mazeBtn.value === 'On' && refreshArr.length > 0){
        let last = mazeImage.length - 1;
        context.putImageData(mazeImage[last], 0, 0);
    }
    let printObj = fullPathHandler(grid);
    algoPrint(printObj.points, printObj.path);
}

let colorCoordinator = {
    1 : [224, 254, 254],
    //'white',
    2 : [199, 206, 234],
    //'rgba(50, 205, 50, .4)',
    3 : [255, 218, 193],
    //'rgba(233, 116, 81, .4)',
    4 : [255, 154, 162],
    //'rgba(8, 143, 143, .4)',
    5 : [255, 255, 216],
    //'rgba(0, 163, 108, .4)',
    6 : [181, 234, 215]
    //'rgba(159, 226, 191, .4)'
};

function Create2DArray(rows) {
    let arr = [];
  
    for (let i=0;i<rows;i++) {
       arr[i] = [];
    }
  
    return arr;
}


function fillSquares(x1, y1, x2, y2){
    if (x1 === x2){
        for (let i = y1; i <= y2; i++)
            context.fillRect(xTransform(x1), yTransform(i), 24, 24);
    }
    else if (y1 === y2){
        for (let i = x1; i <= x2; i++)
            context.fillRect(xTransform(i), yTransform(y1), 24, 24);
    }
}
function xTransform (int){ return (25 * int)}; // + 50
function yTransform (int){ return (25 * int)}; // + 100




function divide(grid, top, bottom, left, right) {
    if (bottom - top <= 2 || right - left <= 2) return; // Just one corridor: nothing to divide
    // Make the probability equal for all possible dividing-wall positions irrespective of their direction
    const choices = (bottom - top + right - left) / 2 - 2;
    const choice = randInt(choices) * 2 + 2; // A wall is always at an even index, not 0
    if (choice >= bottom - top) { // The wall will be vertical
        const splitCol = choice - (bottom - top) + left + 2;
        for (const row of grid.slice(top, bottom)) row[splitCol] = "#";
        // Choose a hole (always at an odd index):
        const hole = randInt((bottom - top) / 2) * 2 + 1 + top;
        grid[hole][splitCol] = ".";
        // Recur on the two created areas
        divide(grid, top, bottom, left, splitCol);
        divide(grid, top, bottom, splitCol, right);
    } else { // The wall will be horizontal
        const splitRow = choice + top;
        for (let i = left; i < right; i++) grid[splitRow][i] = "#";
        // Choose a hole (always at an odd index):
        const hole = randInt((right - left) / 2) * 2 + 1 + left;
        grid[splitRow][hole] = ".";
        // Recur on the two created areas
        divide(grid, top, splitRow, left, right);
        divide(grid, splitRow, bottom, left, right);
    }
}    

function createGrid(numRows, numCols) {
    if ((numRows - 2) % 2 != 1 || (numCols - 2) % 2 != 1) {
        throw "Grid dimensions should be odd and greater than 1"; 
    }
    // Set the surrounding border walls
    const line = "#".repeat(numCols);
    const mid = "#" + ".".repeat(numCols - 2) + "#";
    const grid = [
        [...line],
        ...Array.from({length: numRows - 2}, () => [...mid]),
        [...line]
    ];
    // Main algorithm
    divide(grid, 0, numRows - 1, 0, numCols - 1); 
    return grid;
}

let weightValues = [];

function weightHandler (click) {
    if (mazeBtn.value === 'On') return;
    weightBtn.value = 'On';
    let startEnd = getStartEnd(grid);
    weightValues.splice(0,weightValues.length);

    for (i = 0; i < ((grid.length) * (grid[0].length)); i++){
        let ran;
        if (i !== (startEnd[0] - 1) && i !== (startEnd[1] - 1))
            ran = randInt(5) + 1;
        else ran = 1;
        weightValues.push(ran);
    }

    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++){
                if (grid[i][j] !== 'E' && grid[i][j] !== 'S'){
                    let color = colorCoordinator[weightValues[(j) + ((grid[0].length - 1) * i)]];
                    animate(i, j, [0, 0, 0], color);
                    //context.fillRect(xTransform(j), yTransform(i), 24, 24);
                }
                else if (grid[i][j] === 'E'){
                    // context.fillStyle = "#fd60ba";
                    // context.fillRect(xTransform(j), yTransform(i), 24, 24);
                    let color = [145, 91, 255];
                    animate(i, j, [0, 0, 0], color);
                }
                else {
                    // context.fillStyle = "#0bfc03";
                    // context.fillRect(xTransform(j), yTransform(i), 24, 24);
                    let color = [11, 252, 3];
                    animate(i, j, [0, 0, 0], color);
                }
        }
    }
}

const gridWeight = (r, c, grid) => {
    return weightValues[(c) + ((grid[0].length - 1) * r)];
};



const numberGrid = (R, C) => {
    let grid = new Array(R);            
    for (let i = 0; i < R; i++) {
        grid[i] = new Array(C);
    }
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++){
            grid[i][j] = (j) + ((grid[0].length) * i) + 1;
        }
    }
    return grid
};

function dijHandler(){
    if (weightBtn.value === 'Off') return;
    let startEnd = getStartEnd(grid);
    let size = (grid.length * grid[0].length)
    let numGrid = numberGrid(grid.length, grid[0].length);

    let adj = adjMatrix(numGrid, weightValues);
    let distances = dijkstra(adj, size, startEnd[0]); //1

    let pathypath = fullPath(distances.path, startEnd[1], (startEnd[0]));
    let points = distances.points;

    for (let i = 0; i < points.length; i++){
        setTimeout(function() {
            for (let j = 0; j < points[i].length; j++){
                let r = Math.floor(points[i][j]/grid[0].length)
                let c = (points[i][j] % grid[0].length);
                if (grid[r][c] !== 'E' && grid[r][c] !== 'S'){
                    let colorOne = [6, 170, 222];
                    let colorTwo = [122, 242, 197];
                    if (r < grid.length)
                        animate(r, c, colorOne, colorTwo);
                }
            }
    }, 50 * i);
    }

  setTimeout(function(){
        for (let i = 0; i < pathypath.length; i++){  
            let r = Math.floor(pathypath[i]/grid[0].length)
            let c = (pathypath[i] % grid[0].length) - 1;

            setTimeout(function() {
                if (grid[r][c] !== 'E' && grid[r][c] !== 'S'){
                    let colorOne = [237, 133, 203];
                    let colorTwo = [245, 242, 181];
                    animate(r, c, colorOne, colorTwo);
                }
            }, 150 * i);
        }
}, 50 * points.length);
}

const algoDijPrint = (printObj) => {
    let time = 0;
    let points = printObj.points
    for (let i = 0; i < points.length; i++){
        time++;
        sum += time;
        for (let j = 0; j < points[i].length; j++){
            let r = getCoordinateR(points[key][item]);
            let c = getCoordinateC(points[key][item]);

            setTimeout(function (){
                context.stroke();
                context.fillStyle = 'purple';
                let colorOne = [6, 170, 222];
                let colorTwo = [122, 242, 197];
                animate(r, c, colorOne, colorTwo);
                //context.fillRect(xTransform(c), yTransform(r), 24, 24);
            }, 15 * time);
        }
    }
    
    // for (let i = 1; i <= time; i++){
    //     sum += i;
    // }
    setTimeout(function() {
        for (let i = 1; i < path.length; i++){
            let r = getCoordinateR(path[i]);
            let c = getCoordinateC(path[i]);
            //animate(r, c);
            setTimeout(function() {
                // context.fillStyle = 'yellow';
                // context.fillRect(xTransform(c), yTransform(r), 24, 24);
                let colorOne = [8, 108, 243];
                let colorTwo = [204, 204, 255];
                animate(r, c, colorOne, colorTwo);
            }, 100 * i);

        }
    }, (time * 15));

};

let click = 0;
weightBtn.addEventListener('click', function(){
    click++;
    weightHandler(click);
});
dijBtn.addEventListener('click', dijHandler);
let mazeClick = 0;
mazeBtn.addEventListener('click', function(){
    mazeClick++;
    mazeHandler(grid, mazeClick);
});
//let bfsClic
bfsBtn.addEventListener('click', function(){
    //mazeClick++;
    bfsHandler(grid);
});

let coordinateArr = [];
let refreshArr = [];
let ogGrid = context.getImageData(0, 0, canvas.width, canvas.height)
randomPointsBtn.addEventListener('click', function(){
    if (coordinateArr.length > 0){
        let prevObj = coordinateArr.pop();
        if (mazeBtn.value !== 'On'){
        context.putImageData(ogGrid, 0, 0);
        }
        else {
            let last = mazeImage.length - 1;
            context.putImageData(mazeImage[last], 0, 0);
            context.clearRect(xTransform(prevObj.startCol) + 1,
             yTransform(prevObj.startRow) + 1, 23, 23);
             context.clearRect(xTransform(prevObj.endCol) + 1,
              yTransform(prevObj.endRow) + 1, 23, 23);
        }
        grid[prevObj.startRow][prevObj.startCol] = '.';
        grid[prevObj.endRow][prevObj.endCol] = '.';
    }
    function getRandOdd(max){
        let randNum =   Math.floor(Math.random()* (max - 1)); 
        if(randNum %2 === 0){
            if(randNum === max){
                randNum -= 1;
            } else{
                randNum += 1;
            }
        }
        return randNum;
    }

    let coordObj = {
        startRow : getRandOdd(Math.round(gridHeight / 25)),
        startCol : getRandOdd(Math.round(gridWidth / 25)),
        endRow : getRandOdd(Math.round(gridHeight / 25)),
        endCol : getRandOdd(Math.round(gridWidth / 25))
    };

    context.fillStyle = "#0bfc03";
    context.fillRect(xTransform(coordObj.startCol) + 1, yTransform(coordObj.startRow) + 1, 23, 23);
    context.fillStyle = "#915BFF";

    context.fillRect(xTransform(coordObj.endCol) + 1, yTransform(coordObj.endRow) + 1, 23, 23);

    grid[coordObj.startRow][coordObj.startCol] = 'S';
    grid[coordObj.endRow][coordObj.endCol] = 'E';
    coordinateArr.push(coordObj);
    refreshArr.push(context.getImageData(0, 0, canvas.width, canvas.height));
    if (mazeBtn.value === 'On'){
        mazeImage.push(context.getImageData(0, 0, canvas.width, canvas.height));
    }
});

function clear(){
    mazeBtn.value = 'Off';
    bfsBtn.value = 'Off';
    dijBtn.value = 'Off';
    weightBtn.value = 'Off';
    startBtn.value = 'Off';
    gridReset();
    context.putImageData(ogGrid, 0, 0); 
}
clearBtn.addEventListener('click', clear);

startBtn.addEventListener('click', function(){
    if (mazeBtn.value !== 'On')
        clear();
    startBtn.value = 'On';
    console.log(startBtn.value)
})

let pos = {
    x: 0,
    y: 0
};

let canvasOffsetX = canvas.offsetLeft;
let canvasOffsetY = canvas.offsetTop;

function setPosition(e){
    pos.x = e.clientX - canvasOffsetX ;
    pos.y = e.clientY - canvasOffsetY ;
}

// context.fillStyle = "#0bfc03";
// context.fillRect(xTransform(3), yTransform(3), 24, 24);
// context.fillStyle = "#915BFF";
canClick = 0;

canvas.addEventListener('click', function(e){
    console.log(canClick);

    if (canClick === 1 && startBtn.value === 'On'){
        setPosition(e);
        console.log(pos);
        let x = Math.floor(pos.x/ 25) * 25;
        let y = Math.floor(pos.y/ 25) * 25;
        context.fillStyle = '#915BFF';
        context.fillRect(x + 1, y + 1, 23, 23);
        grid[y / 25][x / 25] = 'E';
        startBtn.value = 'Off';
        canClick = 0;
    }

    if (canClick === 0 && startBtn.value === 'On'){
        canClick++;
        setPosition(e);
        console.log(pos);
        let x = Math.floor(pos.x/ 25) * 25;
        let y = Math.floor(pos.y/ 25) * 25;
        context.fillStyle = '#0bfc03';
        context.fillRect(x + 1, y + 1, 23, 23);
        grid[y / 25][x / 25] = 'S';
    }
})