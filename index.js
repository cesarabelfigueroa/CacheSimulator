let _ = require('lodash');
let Manager = require('./core/FileSystem');
let Promise = require("bluebird");
let FileSystem = new Manager();
let config = require('./config.json');
let fileContent = FileSystem.read("./assets/database.txt");
let RAM = fileContent.slice();
let time = 0;
var result = {};
let CACHE = {

};

let sort = (data) => {
    let result = {};
    //   for (const type in config.types) {
    let type = config.types[0];
    time = 0;
    for (let i = 0; i < config.ram - 1; i++) {
        for (let j = i + 1; j < config.ram; j++) {
            if (read(i, type) > read(j, type)) {
                let value = read(i, type);
                write(i, type, read(j, type));
                write(j, type, value);
            }
        }
    }


    result[type] = {
        time: time
    };

    console.log(result);
    RAM = fileContent;

    // console.log(result);


    //}
};

let read = (direction, type) => {
    let result;
    switch (type) {
        case "sin cache":
            result = readWithOutCahe(direction);
            break
        case "directa":
            result = directRead(direction);
            break
        case "asociativa":
            break
        case "asociativa por conjuntos":
            break
    }

    //console.log(result);
    return result;
};


let write = (direction, type, value) => {
    switch (type) {
        case "sin cache":
            result = writeWithOutCahe(direction, value);
            break
        case "directa":
            result = directRead(direction);
            break
        case "asociativa":
            break
        case "asociativa por conjuntos":
            break
    }
};

let directRead = (direction) => {
    let pd = math.trunc(direction / config.k),
        ed = math.trunc(direction / config.m);
    let line = d % config.m;

    if (true) {
        return CACHE[line][pd];
    } else {

    }
};


let readWithOutCahe = (direction) => {
    time += 0.1;
    // console.log(direction, RAM[direction]);
    return RAM[direction];
};

let writeWithOutCahe = (direction, value) => {
    time += 0.1;
    RAM[direction] = value;
};


sort(RAM);