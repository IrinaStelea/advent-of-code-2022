//Description: https://adventofcode.com/2022/day/8

//parse the input
const pathDay8 = require("path");
let inputDay8: (string | number)[][] = require("fs")
    .readFileSync(pathDay8.resolve(__dirname, "../../inputs/AC08.txt"), "utf-8")
    .split("\n")
    .map((el: string) => el.split(""));

//convert to numbers
let convertedInput: number[][] = inputDay8.map((subArr: (string | number)[]) =>
    subArr.map((el: string | number) => +el)
);

//number of rows: 99
//number of columns: 99

//eliminate arrays whose max value is at the right or left edge

for (let arr of convertedInput) {
    let max: number = Math.max(...(arr as number[]));
    let index: number = convertedInput.indexOf(arr);
    if (arr.indexOf(max) === 0 || arr.lastIndexOf(max) === arr.length - 1) {
        convertedInput.splice(index, 1);
    }
}

//find highest trees incrementally on the horizontals
const findMaxesPerHorizDirection = (arrayOfArrays: number[][]): number[][] => {
    let incrementalMaxesPerDirection: number[][] = [];
    for (let array of arrayOfArrays) {
        let row: number = arrayOfArrays.lastIndexOf(array);
        let leftEdge: number = array[0];
        let rightEdge: number = array[array.length - 1];
        let leftMax: number = leftEdge;
        let rightMax: number = rightEdge;

        //traversing left to right
        for (let i: number = 1; i < array.length - 1; i++) {
            if (array[i] > leftMax) {
                incrementalMaxesPerDirection.push([row, array[i], i]);
                leftMax = array[i];
            }
        }
        //traversing right to left
        for (let j: number = array.length - 2; j > 0; j--) {
            if (array[j] > rightMax) {
                incrementalMaxesPerDirection.push([row, array[j], j]);
                rightMax = array[j];
            }
        }
    }
    return incrementalMaxesPerDirection;
};

let horizontalMaxes: number[][] = findMaxesPerHorizDirection(convertedInput);

//rotate the original array to access the verticals
let transposedInput: number[][] = convertedInput[0].map(
    (el: number, i: number) =>
        convertedInput.map((subArray: number[]) => subArray[i])
);

//find highest trees incrementally on the verticals
const findMaxesPerVerticalDirection = (
    arrayOfArrays: number[][]
): number[][] => {
    let incrementalMaxesPerDirection: number[][] = [];
    for (let array of arrayOfArrays) {
        let col: number = arrayOfArrays.lastIndexOf(array);
        let topEdge: number = array[0];
        let bottomEdge: number = array[array.length - 1];
        let topMax: number = topEdge;
        let bottomMax: number = bottomEdge;

        //traverse top to bottom excluding edges
        for (let i: number = 1; i < array.length - 1; i++) {
            if (array[i] > topMax) {
                incrementalMaxesPerDirection.push([i, array[i], col]);
                topMax = array[i];
            }
        }

        //traverse bottom to top excluding edges
        for (let j: number = array.length - 2; j > 0; j--) {
            if (array[j] > bottomMax) {
                incrementalMaxesPerDirection.push([j, array[j], col]);
                bottomMax = array[j];
            }
        }
    }
    return incrementalMaxesPerDirection;
};

let verticalMaxes: number[][] = findMaxesPerVerticalDirection(transposedInput);

//put all maxes in one array
let masterArray: number[][] = [...horizontalMaxes, ...verticalMaxes];

//remove forest edges
let masterArrayMinusEdges: number[][] = masterArray.filter(
    (el: number[]) => el[0] !== 0 && el[0] !== 98 && el[2] !== 0 && el[2] !== 98
);

//remove duplicate occurrences of highest trees
const setArray: Set<string> = new Set(
    masterArrayMinusEdges.map((x: number[]) => JSON.stringify(x))
);

//array of unique tallest trees
const uniqArray: string[] = [...setArray].map((x: string) => JSON.parse(x));

//add edges of the forest
let visibleTrees: number = uniqArray.length + 99 + 99 + 97 + 97;
// console.log("visibleTrees: 	", visibleTrees); //1736
