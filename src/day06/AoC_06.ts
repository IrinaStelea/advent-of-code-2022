//Description: https://adventofcode.com/2022/day/6

//parse the input
const pathDay6 = require("path");
const inputDay6: string[] = require("fs")
    .readFileSync(pathDay6.resolve(__dirname, "../../inputs/AC06.txt"), "utf-8")
    .split("");

const findChar = (buffer: number): number => {
    let chunkOfChars: string = inputDay6[0];

    let count: number = 1;

    for (let i: number = 1; i < inputDay6.length; i++) {
        if (!chunkOfChars.includes(inputDay6[i])) {
            chunkOfChars += inputDay6[i];
            count++;
        } else {
            chunkOfChars =
                chunkOfChars.substring(chunkOfChars.indexOf(inputDay6[i]) + 1) +
                inputDay6[i];
            count = chunkOfChars.length;
        }

        if (count === buffer) {
            return i + 1; //because I started from i = 1
        }
    }
    return -1;
};

//PART 1
let partOne: number = findChar(4);
//console.log(partOne); //1034

//PART 2
let partTwo: number = findChar(14);
//console.log(partTwo); //2472
