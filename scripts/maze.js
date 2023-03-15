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

const gridMaker = (row, col) => {
    let grid = [];
    for (let r = 0; r < row; r++){
        let arr = [];
        for (let c = 0; c < col; c++){
            arr.push('.');
        }
        grid.push(arr);

    }
    return grid;
};

let grid = gridMaker(12, 20);



const Mazer = (grid) => {
    let arr = [];

    for (let i = 0; i < grid[0].length; i++){
        console.log(grid[0][i]);
        grid[0][i] = '#';
        arr.push('(' + 0 + ',' + i + ')');
        grid[grid.length - 1][i] = "#";
        arr.push('(' + (grid.length - 1) + ',' + i + ')');
    }
    for (let i = 0; i < grid.length; i++){
       grid[i][0] = '#';
       arr.push('(' + i + ',' + 0 + ')');
       grid[i][grid[0].length - 1] = "#";
       arr.push('(' + i + ',' + (grid[0].length - 1) + ')');
    }
    const randomIndex = (arr) => {return Math.floor(Math.random() * arr.length);};

    let start = arr[randomIndex(arr)];
    console.log(start)
    let bool = true;
    while(bool) {
        let r = getCoordinateR(start);
        let c = getCoordinateC(start);
        let moves = [];

        if (grid[r - 1][c] !== '#'){
            moves.push('up');
        }
        else if (grid[r][c + 1] !== '#'){
            console.log('right');
            moves.push('right')
        }
        else if(grid[r - 1][c] === '#'
        && grid[r][c + 1] === '#'){
            bool = false;
        }
        const index = randomIndex(moves);
        if (moves[index] === 'up'){
            grid[r - 1][c] = '#';
            r--;
        }
        else {
            grid[r][c + 1] = '#';
            c++;
        }
    }
    console.log(grid)
};

