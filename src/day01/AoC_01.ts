// Description: https://adventofcode.com/2022/day/1

//parse the input
const path = require("path");
const input: string[] = require("fs")
    .readFileSync(path.resolve(__dirname, "../../inputs/AC01.txt"), "utf-8")
    .split("\n\n");
// console.log(input);

const numberArrays: string[][] = input.map((el) => el.split("\n"));

const sumsArray: number[] = numberArrays.map((arr: string[]) => {
    let sum: number = 0;

    for (let element of arr) {
        sum += +element;
    }

    return sum;
});

//PART 1
let max: number = Math.max(...sumsArray);
// console.log(max); //71300

//PART 2

//sort array in decreasing order
let sortedArray: number[] = sumsArray.sort((a, b) => b - a);

let topThreeElves: number = sortedArray[0] + sortedArray[1] + sortedArray[2];
// console.log(topThreeElves); //209691.
