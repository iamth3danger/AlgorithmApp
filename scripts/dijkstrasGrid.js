function adjMatrix(grid, cost) {
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    let adjacency = {};

    for (let r = 0; r < grid.length; r++)
        for (let c = 0; c < grid[0].length; c++){
            adjacency[grid[r][c]] = [];
            for (i = 0; i < 4; i++){
                rr = r + dr[i];
                cc = c + dc[i];
            
                let arr = [];
                if (rr < 0 || cc < 0) continue;
                if (rr >= grid.length || cc >= grid[0].length) continue;
                
                arr.push(grid[rr][cc]);
                arr.push(cost[(grid[rr][cc] - 1)]);
                adjacency[grid[r][c]].push(arr);
            }
    }
    return adjacency
}

function dijkstra(g, n, s) {
    let visinx = [];
    let visDis = [];
    let dist = [];
    let prev = [];
    let visObj = {};
    let max = 0;
    for (key in g){
        for (el in g[key])
            if(g[key][el][1] > max)
            max = g[key][el][1];
    }
    for (let i = 0; i < max ** 2; i++){
        visDis.push(false);
    }
    for (let i = 0; i < n; i++){
        visinx.push(false);
        dist.push(Infinity);
        prev.push(null);
    }
    dist[s] = 0;
    let pq = [];
    let bigArr = [];
    pq.push([s, dist[s]]);
    while (pq.length > 0){

        let arr = pq.shift();
        let index = arr[0];
        let minValue = arr[1];
        visinx[index] = true;
        if (visObj['( ' + index + ', ' + minValue + ' )']) continue;
        visObj['( ' + index + ', ' + minValue + ' )'] = true;
        let lilArr = [];
        if (dist[index] < minValue) continue;
        for (edge in g[index]){

            let edgeIndex = g[index][edge][0];
            lilArr.push(edgeIndex);
            let edgeDist = g[index][edge][1];
            let newDist = dist[index] + edgeDist;

            if (newDist < dist[edgeIndex]){
                prev[edgeIndex] = index;
                dist[edgeIndex] = newDist;
                pq.push([edgeIndex, newDist]);
            }
        }
        bigArr.push(lilArr);
    }
    let path = {};
    for (let i = 0; i < prev.length; i++){
        path[i] = prev[i];
    }

    let printObj = {
        points : bigArr,
        path : path
    };
    return printObj;
}

function fullPath(pathKey, start, end){
    let pathArr = [];
    
    if (end > start){
        while (end > start){
            pathArr.push(start);
            start = pathKey[start];
        }
        pathArr.push(end);
        let revPath = [];
        for (let i = pathArr.length - 2; i >= 0; i--){
            revPath.push(pathArr[i]);
        }
        return revPath;
    }
    else {
        while (end < start){
            pathArr.push(start);
            start = pathKey[start];
        }
        pathArr.push(start);
        let revPath = [];
        for (let i = pathArr.length - 2; i >= 0; i--){
            revPath.push(pathArr[i]);
        }
        return revPath;
    }
}
