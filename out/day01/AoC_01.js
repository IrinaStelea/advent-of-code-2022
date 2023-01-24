"use strict";
// Description: https://adventofcode.com/2022/day/1
//parse the input
const path = require("path");
const input = require("fs")
    .readFileSync(path.resolve(__dirname, "../../inputs/AC01.txt"), "utf-8")
    .split("\n\n");
// console.log(input);
const numberArrays = input.map((el) => el.split("\n"));
const sumsArray = numberArrays.map((arr) => {
    let sum = 0;
    for (let element of arr) {
        sum += +element;
    }
    return sum;
});
//PART 1
let max = Math.max(...sumsArray);
// console.log(max); //71300
//PART 2
//sort array in decreasing order
let sortedArray = sumsArray.sort((a, b) => b - a);
let topThreeElves = sortedArray[0] + sortedArray[1] + sortedArray[2];
// console.log(topThreeElves); //209691.
