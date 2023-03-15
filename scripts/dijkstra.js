let weightValues = [];

for (i = 0; i < ((grid.length - 1) * (grid[0].length - 1)); i++){
    let ran = randInt(5) + 1;
    weightValues.push(ran);
}

console.log(weightValues);

const gridWeight = (r, c, grid) => {
    return weightValues[(c) + ((grid[0].length - 1) * r)]
};

console.log(gridWeight(0, 3, grid));

const emptyGrid = (R, C) => {
    let empty = new Array(R);            
    for (let i = 0; i < R; i++) {
        empty[i] = new Array(C);
    }
    return empty;
};
console.log('balls');
console.log(emptyGrid(3, 3));

const dijskraPathHandler = (graph) => {
    let visited = visitedGrid(graph.length, graph[0].length);
    let distances = distanceGrid(graph.length, graph[0].length);
    let startCoordinates = findStart(graph);
    let startR = getCoordinateR(startCoordinates);
    let startC = getCoordinateC(startCoordinates);
    let points = {};
    let inObj = {
        visited : visited,
        distances : distances,
        sr : startR,
        sc : startC,
        rq : [],
        cq : [],
        keyArr : [],
        nodesLeftInLayer : 0,
        nodesInNextLayer : 0,
        moveCount : 0
    };
    return solveDijskra(graph, inObj, points);
};

const solveDijskra = (graph, inObj, points) => {

    inObj.rq = [ inObj.sr ];
    inObj.cq = [ inObj.sc ];
    inObj.distances[inObj.sr][inObj.sc] = 0;
    inObj.visited[inObj.sr][inObj.sc] = true;


    while (inObj.rq.length > 0){
        
        let r = inObj.rq.shift();
        let c = inObj.cq.shift();
        prev[inObj.moveCount] = '(' + r + ',' + c + ')';

        if (graph[r][c] === 'E'){
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
    console.log(inObj.visited);
    return -1;

};




const exploreGrid = (graph, r, c, inObj, points) => {
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

        inObj.rq.push(rr);
        inObj.cq.push(cc);
        inObj.visited[rr][cc] = true;

        // context.fillStyle = "purple";
        // setTimeout(function() {
        //     context.fillRect(xTransform(cc), yTransform(rr), 24, 24);
        // }, 100 * i);

        //context.fillRect(xTransform(cc), yTransform(rr), 24, 24);
        inObj.nodesInNextLayer++;
    }
};




















