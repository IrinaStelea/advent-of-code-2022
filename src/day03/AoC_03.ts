//Description: https://adventofcode.com/2022/day/3

const pathDay3 = require("path");
const inputDay3: string[] = require("fs")
    .readFileSync(pathDay3.resolve(__dirname, "../../inputs/AC03.txt"), "utf-8")
    .split("\n");

const splitStrings: string[][] = inputDay3.map((el) => [
    el.slice(0, Math.floor(el.length / 2)),
    el.slice(Math.floor(el.length / 2)),
]);

let sharedItems: string[] = [];

splitStrings.forEach((el) => {
    for (let char of el[0]) {
        if (el[1].includes(char)) {
            sharedItems.push(char);
            break; //this is necessary to avoid duplicates
        }
    }
});

//PART 1
let priorities: string =
    " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let sumOfPriorities: number = 0;

sharedItems.forEach((el) => (sumOfPriorities += priorities.indexOf(el)));
// console.log(sumOfPriorities); //8139

//PART 2
let sharedBadges: string[] = [];

for (let i: number = 0; i < inputDay3.length; i += 3) {
    for (let char of inputDay3[i]) {
        if (
            inputDay3[i + 1].includes(char) &&
            inputDay3[i + 2].includes(char)
        ) {
            sharedBadges.push(char);
            break;
        }
    }
}

let sumOfBadges: number = 0;
sharedBadges.forEach((el) => (sumOfBadges += priorities.indexOf(el)));
// console.log(sumOfBadges); //2668
