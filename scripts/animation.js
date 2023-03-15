

const animate = (row, col, colorOne, colorTwo) => {

    let pixel = tinySquare();
    let imgData = context.getImageData(0, 0, 24, 24);
   
    let pixGrid = new Array(24);
    for (let i = 0; i < 24; i++) {
        pixGrid[i] = new Array(23);
    }
    for (let i = 0; i < pixGrid.length; i++){
        for (let j = 0; j < pixGrid[i].length; j++){
            pixGrid[i][j] =  (i * pixGrid[i].length) + j;
            
        }
        //index += (canvas.width);
    }
    
    let workArray = [];
    let secArray = [];

    for (let i = 0; i < 20; i++){
        let modify = 11;
        const final = (3 + (2 * i));
        setTimeout(function(){
        if(i < 11){
            for (let j = 0; j < final; j++){
                workArray.push(((11 - i) * 24) + j + modify - i);
                workArray.push(((12 + i) * 24) + j + modify - i);
                if (i > 0){
                    workArray.push(((11 - i) * 24) + 11 + (24 * j) - i);
                    workArray.push(((11 - i) * 24) + 12 + (24 * j) + i);
                }
            }
            for (let i = 0; i < workArray.length; i++){
                let index = workArray[i];
        
                pixel[index].red = colorOne[0];
                pixel[index].green = colorOne[1];
                pixel[index].blue = colorOne[2];     
            }
        }
        if (i > 8){
            let k = i - 9;
            for (let j = 0; j < (3 + (2 * k)); j++){
                secArray.push(((11 - k) * 24) + j + modify - k);
                secArray.push(((12 + k) * 24) + j + modify - k);
                if (i > 0){
                    secArray.push(((11 - k) * 24) + 11 + (24 * j) - k);
                    secArray.push(((11 - k) * 24) + 12 + (24 * j) + k);
                }
            }
        }

        for (let i = 0; i < secArray.length; i++){
            let index = secArray[i];
            
            pixel[index].red = colorTwo[0];
            pixel[index].green = colorTwo[1];
            pixel[index].blue = colorTwo[2];     
        }

        for (let i = 0; i < pixel.length; i++){
            imgData.data[4 * i] = pixel[i].red;
            imgData.data[(4 * i) + 1] = pixel[i].green;
            imgData.data[(4 * i) + 2] = pixel[i].blue;
            
            // imgDataArr.push(imgData);
            context.putImageData(imgData, xTransform(col), yTransform(row));

        }
    }, 50 * i);
    }
};

function tinySquare(){
    const imgData = context.getImageData(0, 0, 24, 24);

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
}
