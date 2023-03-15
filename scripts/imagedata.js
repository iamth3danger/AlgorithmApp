
const colorValues = (context) => {
    let imgData = context.getImageData(0, 0, width, height);
    let pixelArray = [];
    let pixelWidth = Math.floor(width);

    let pixelX = 0;
    let pixelY = 0;

    for (let i = 0; i < imgData.data.length; i += 4){
    pixelX++
    if (pixelX === pixelWidth){
        pixelX -= pixelWidth;
        pixelY++;
    }
    let red = imgData.data[i];
    let green = imgData.data[i + 1];
    let blue = imgData.data[i + 2]
    let pixelLog = {
        red : red,
        green : green,
        blue : blue,
        x : pixelX,
        y : pixelY
    };
    pixelArray.push(pixelLog);

    }
    return pixelArray;
};


const gridMaker = (pixel, row, col) => {
    let grid = [];
    for (let r = 0; r < row; r++){
        let arr = [];
        for (let c = 0; c < col; c++){
            let index = pixel.findIndex(index => index.x === xTransform(c) + 20
            && index.y === yTransform(r) + 20);
           if (colorBool(pixel[index], 11, 252, 3)) arr.push('S');
           //253, 96, 186
           else if (colorBool(pixel[index], 145, 91, 255)) arr.push('E');
           else if (colorBool(pixel[index], 0, 0, 0)) arr.push('#');
           else arr.push('.');

        }
        grid.push(arr);

    }
    return grid;
};

const colorBool = (index, red, green, blue) => {
    if (index.red === red
        && index.green === green
        && index.blue === blue) return true;
    else return false;
};
