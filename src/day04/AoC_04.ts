//Description: https://adventofcode.com/2022/day/4

//parse the input
const pathDay4 = require("path");
const inputDay4: string[] = require("fs")
    .readFileSync(pathDay4.resolve(__dirname, "../../inputs/AC04.txt"), "utf-8")
    .split("\n");

//PART 1
const pairsArr: string[][] = inputDay4.map((el) => el.split(","));

let count: number = 0;

pairsArr.forEach((el) => {
    let firstFirst: number = parseInt(el[0].slice(0, el[0].indexOf("-")));
    let firstSecond: number = parseInt(el[0].slice(el[0].indexOf("-") + 1));
    let secondFirst: number = parseInt(el[1].slice(0, el[1].indexOf("-")));
    let secondSecond: number = parseInt(el[1].slice(el[1].indexOf("-") + 1));

    //include cases where pairs are the same

    if (
        // first pair contained within second
        (firstFirst >= secondFirst && firstSecond <= secondSecond) ||
        //second pair contained within first
        (firstFirst <= secondFirst && firstSecond >= secondSecond)
    ) {
        count++;
    }
});

//console.log(count); //582

//PART 2
let countOverlaps: number = 0;

pairsArr.forEach((el) => {
    let firstFirst = parseInt(el[0].slice(0, el[0].indexOf("-")));
    let firstSecond = parseInt(el[0].slice(el[0].indexOf("-") + 1));
    let secondFirst = parseInt(el[1].slice(0, el[1].indexOf("-")));
    let secondSecond = parseInt(el[1].slice(el[1].indexOf("-") + 1));
    //include cases where pairs are the same

    if (
        // first pair contained partially within second
        (firstFirst <= secondFirst && firstSecond >= secondSecond) ||
        (firstFirst >= secondFirst && firstSecond <= secondSecond) ||
        (firstFirst <= secondSecond && secondFirst <= firstSecond)
    ) {
        countOverlaps++;
    }
});

// console.log(countOverlaps); //893
