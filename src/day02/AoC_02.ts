//Description: https://adventofcode.com/2022/day/2

//parse the input
const pathDay2 = require("path");
const inputDay2: string[] = require("fs")
    .readFileSync(pathDay2.resolve(__dirname, "../../inputs/AC02.txt"), "utf-8")
    .split("\n");

let totalScore: number = 0;

const score = (results: string): void => {
    switch (results) {
        //draw cases
        case "A X":
            totalScore += 4;
            break;
        case "B Y":
            totalScore += 5;
            break;
        case "C Z":
            totalScore += 6;
            break;
        //other player wins
        case "A Z":
            totalScore += 3;
            break;
        case "C Y":
            totalScore += 2;
            break;
        case "B X":
            totalScore += 1;
            break;
        //you win
        case "C X":
            totalScore += 7;
            break;
        case "B Z":
            totalScore += 9;
            break;
        case "A Y":
            totalScore += 8;
            break;
    }
};

//PART 1
inputDay2.forEach((el: string) => score(el));
// console.log(totalScore); //12772

//PART 2
let newTotalScore: number = 0;

const newScore = (results: string): void => {
    switch (results) {
        //draw cases
        case "A Y":
            newTotalScore += 4;
            break;
        case "B Y":
            newTotalScore += 5;
            break;
        case "C Y":
            newTotalScore += 6;
            break;
        //other player wins
        case "A X":
            newTotalScore += 3;
            break;
        case "B X":
            newTotalScore += 1;
            break;
        case "C X":
            newTotalScore += 2;
            break;
        //you win
        case "A Z":
            newTotalScore += 8;
            break;
        case "B Z":
            newTotalScore += 9;
            break;
        case "C Z":
            newTotalScore += 7;
            break;
    }
};

inputDay2.forEach((el: string) => newScore(el));
// console.log(newTotalScore); //11618
