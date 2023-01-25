//Description: https://adventofcode.com/2022/day/7

//parse the input
const pathDay7 = require("path");
const inputDay7: string[] = require("fs")
    .readFileSync(pathDay7.resolve(__dirname, "../../inputs/AC07.txt"), "utf-8")
    .split("\n");

//take out the ls commands
const cleanInput: string[] = inputDay7.filter((el) => el !== "$ ls");

//map the commands to an object representing the file system

type MapObject = {
    [key: string]: string | number | MapObject;
};

let mapObject = {} as MapObject;
let fullPath: string[] = [];
let currPos: MapObject | string;

cleanInput.forEach((el) => {
    if (el.includes("$ cd")) {
        const dir: string = el.slice(5);

        if (dir === "..") {
            fullPath.pop();
        } else if (dir === "/") {
            fullPath = [];
        } else {
            fullPath.push(dir);
        }
    } else {
        //either directory or file
        currPos =
            fullPath.length === 0
                ? mapObject
                : fullPath.reduce(
                      (prev, curr) => prev[curr] as MapObject,
                      mapObject
                  );
        if (el.includes("dir ")) {
            let currDir: string = el.slice(4);
            currPos[currDir] = {};
        } else {
            //element is a file
            let sizeName: string[] = el.split(" ");
            let size: number = +sizeName[0];
            let name: string = sizeName[1];
            currPos[name] = size;
        }
    }
});

// console.log("mapObject: 	", mapObject);

//write the map object to a file
// require("fs").writeFileSync(
//     "./advent-of-code/mappedInput",
//     JSON.stringify(mapObject, null, 4)
// );

//PART 1
//need an array instead of an object to keep track of filesizes due to some identical folder names
let sumObjArray: (string | number)[][] = [];

const calculateSum = (obj: MapObject): number => {
    let sum: number = 0;
    for (let item in obj) {
        if (typeof obj[item] === "object") {
            let newSum: number = calculateSum(obj[item] as MapObject);
            sumObjArray.push([item, newSum]);
            sum += newSum;
        } else {
            sum += obj[item] as number;
        }
    }
    return sum;
};

calculateSum(mapObject);

//find smallest folders
let smallFolders = sumObjArray.filter(
    (el: (string | number)[]) => el[1] <= 100000
);

//add the folder sizes
let sum: number = 0;
for (let folder of smallFolders) {
    sum += folder[1] as number;
}
console.log("sum:", sum); //1297159

// PART 2
const diskSpace: number = 70000000;
const neededSpace: number = 30000000;

let totalFileSystem: MapObject = { root: mapObject };
let usedSpace: number = calculateSum(totalFileSystem);

const necessarySpace: number = neededSpace - (diskSpace - usedSpace);

let sortedFolderSizes: (string | number)[][] = sumObjArray.sort(
    (a: (string | number)[], b: (string | number)[]) =>
        (a[1] as number) - (b[1] as number)
);

let folderToDelete = sortedFolderSizes.find(
    (el: (string | number)[]) => el[1] >= necessarySpace
);

// console.log("size of folderToDelete: 	", folderToDelete[1]); //3866390
