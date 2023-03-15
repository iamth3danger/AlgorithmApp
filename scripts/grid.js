
// let R = 12;
// let C = 20;

// let sr = 4, sc = 3;
// let rq, cq;


const pathPrint = (path, color) => {
    for (let i = 1; i < path.length; i++){
        let r = getCoordinateR(path[i]);
        let c = getCoordinateC(path[i]);
        
        setTimeout(function() {
            context.fillStyle = color;
            context.fillRect(xTransform(c), yTransform(r), 24, 24);
        }, 150 * i);

    }
};

const algoPrint = (points, path) => {
    let time = 0;
    let sum = 0;
    for (key in points){
        time++;
        sum += time;
        for (item in points[key]){
            let r = getCoordinateR(points[key][item]);
            let c = getCoordinateC(points[key][item]);

            setTimeout(function (){
                if (grid[r][c] !== 'E'){
                    let colorOne = [6, 170, 222];
                    let colorTwo = [122, 242, 197];
                    animate(r, c, colorOne, colorTwo);
                }
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
                if (grid[r][c] !== 'E'){
                    let colorOne = [8, 108, 243];
                    let colorTwo = [204, 204, 255];
                    animate(r, c, colorOne, colorTwo);
                }
            }, 100 * i);

        }
    }, (time * 15));

};

const visitedGrid = (R, C) => {
    let visited = new Array(R);            
    for (let i = 0; i < R; i++) {
        visited[i] = new Array(C);
    }
    for (let i = 0; i < visited.length; i++){
        for (let j = 0; j < visited[i].length; j++){
            visited[i][j] = false;
        }
    }
    return visited
};


const findStart = (graph) => {
    for (let r = 0; r < graph.length; r++){
        for (let c = 0; c < graph[0].length; c++){
            if (graph[r][c] === 'S') {
                return '(' + r + ',' + c + ')';
            }
        }
    }
};


const getCoordinateR = (str) => {
    let num;

    for (let i = 0; i < str.length; i++){
        if (str.charAt(i) === ',') num = i;
    }
    let sub = str.substr(1, num);

    return parseInt(sub.replace(/[^0-9\.]/g, ''), 10);
};

const getCoordinateC = (str) => {
    let num;

    for (let i = 0; i < str.length; i++){
        if (str.charAt(i) === ',') num = i;
    }
    let sub = str.substr(num, str.length - 1);

    return parseInt(sub.replace(/[^0-9\.]/g, ''), 10);
};

let prev = [];
let count = 0;
const fullPathHandler = (graph) => {
    let visited = visitedGrid(graph.length, graph[0].length);
    let startCoordinates = findStart(graph);
    let startR = getCoordinateR(startCoordinates);
    let startC = getCoordinateC(startCoordinates);
    let points = {};
    let inObj = {
        visited : visited,
        sr : startR,
        sc : startC,
        rq : [],
        cq : [],
        keyArr : [],
        nodesLeftInLayer : 0,
        nodesInNextLayer : 0,
        moveCount : 0,
        indexCount : 0
    };
    return solvePath(graph, inObj, points);
};

const solvePath = (graph, inObj, points) => {

    inObj.rq = [ inObj.sr ];
    inObj.cq = [ inObj.sc ];

    inObj.visited[inObj.sr][inObj.sc] = true;

    while (inObj.rq.length > 0){
        
        let r = inObj.rq.shift();
        let c = inObj.cq.shift();
        prev[inObj.moveCount] = '(' + r + ',' + c + ')';

        if (graph[r][c] === 'E'){
            //algoPrint(points);
            let key = '(' + r + ',' + c + ')';
            if(!(key in points)) {
                points[key] = [];
                inObj.keyArr.push(key);
            }
                return pathLog(points, inObj.keyArr);
        }
        
        exploreNeighbors(graph, r, c, inObj, points);
        inObj.nodesLeftInLayer--;
        if (inObj.nodesLeftInLayer === 0){
            inObj.nodesLeftInLayer = inObj.nodesInNextLayer;
            inObj.nodesInNextLayer = 0;
            inObj.moveCount++;
        }
    }
    return -1;

};




const exploreNeighbors = (graph, r, c, inObj, points) => {
    pointArr = [];

    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    const R = inObj.visited.length;
    const C = inObj.visited[0].length;

    let key = '(' + r + ',' + c + ')';
    if(!(key in points)) {
        points[key] = [];
        inObj.keyArr.push(key);
    }

    let algPath = [];

    for (i = 0; i < 4; i++){
        rr = r + dr[i];
        cc = c + dc[i];
    
        
        if (rr < 0 || cc < 0) continue;
        if (rr >= R || cc >= C) continue;
        if (graph[rr][cc] === '#') continue;

        algPath.push('(' + rr + ',' + cc + ')');

        if (inObj.visited[rr][cc]) continue;

        let items = '(' + rr + ',' + cc + ')';
        points[key].push(items);
        pointArr.push(items);
        inObj.rq.push(rr);
        inObj.cq.push(cc);
        inObj.visited[rr][cc] = true;
        
        //context.fillRect(xTransform(cc), yTransform(rr), 24, 24);
        inObj.nodesInNextLayer++;
    }
    
};


function getKeyByValue(object, value){
    return Object.keys(object).find(key => 
        {for (item in object[key]){
        if(object[key][item] === value){
            return key;
        };
    }});
}

const pathLog = (graph, arr) => {
    let start;
    for (const key in graph){
        if (graph[key].length === 0){
            start = key;
        }
    }
    
    let path = [];
    path.unshift(start);
    while (getKeyByValue(graph, start) !== undefined){
        start = getKeyByValue(graph, start);
        path.unshift(start);
    }
    const printObj = {
        points : graph,
        path : path
    };

    return printObj;
};