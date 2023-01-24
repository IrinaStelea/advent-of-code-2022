//Description: https://adventofcode.com/2022/day/5

//parse the input
const pathDay5 = require("path");
const inputDay5: string[] = require("fs")
    .readFileSync(pathDay5.resolve(__dirname, "../../inputs/AC05.txt"), "utf-8")
    .split("\n")
    .slice(10);

//PART 1
let movementsArr: number[][] = inputDay5
    .map((el) => el.split(" "))
    .map((el) => [+el[1], +el[3], +el[5]]);

let startConfig: string[][] = [
    [],
    ["N", "S", "D", "C", "V", "Q", "T"],
    ["M", "F", "V"],
    ["F", "Q", "W", "D", "P", "N", "H", "M"],
    ["D", "Q", "R", "T", "F"],
    ["R", "F", "M", "N", "Q", "H", "V", "B"],
    ["C", "F", "G", "N", "P", "W", "Q"],
    ["W", "F", "R", "L", "C", "T"],
    ["T", "Z", "N", "S"],
    ["M", "S", "D", "J", "R", "Q", "H", "N"],
];

const moveBoxes = (array: number[]): void => {
    for (let i: number = 1; i <= array[0]; i++) {
        let crate: string = startConfig[array[1]].pop() as string;
        startConfig[array[2]].push(crate);
    }
};

movementsArr.forEach((el) => moveBoxes(el));

let topCrates: string = "";

startConfig.shift();

startConfig.forEach((el) => (topCrates += el[el.length - 1]));

// console.log("topCrates: 	", topCrates); //FRDSQRRCD

//PART 2
startConfig = [
    [],
    ["N", "S", "D", "C", "V", "Q", "T"],
    ["M", "F", "V"],
    ["F", "Q", "W", "D", "P", "N", "H", "M"],
    ["D", "Q", "R", "T", "F"],
    ["R", "F", "M", "N", "Q", "H", "V", "B"],
    ["C", "F", "G", "N", "P", "W", "Q"],
    ["W", "F", "R", "L", "C", "T"],
    ["T", "Z", "N", "S"],
    ["M", "S", "D", "J", "R", "Q", "H", "N"],
];

const moveBoxesNew = (array: number[]): void => {
    let crates: string[] = startConfig[array[1]].splice(-array[0]);
    for (let crate of crates) {
        startConfig[array[2]].push(crate);
    }
};

movementsArr.forEach((el) => moveBoxesNew(el));

let topCratesPart2: string = "";
startConfig.shift();
startConfig.forEach((el) => (topCratesPart2 += el[el.length - 1]));

// console.log("topCratesPart2: 	", topCratesPart2); //HRFTQVWNN
