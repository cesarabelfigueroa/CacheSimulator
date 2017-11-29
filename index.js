let _ = require('lodash');
let Manager = require('./core/FileSystem');
let Promise = require("bluebird");
let FileSystem = new Manager();
let config = require('./config.json');
let fileContent = FileSystem.read("./assets/database.txt");
let RAM = fileContent.slice();
let time = 0;
var result = {};
let valid = {};
let modify = {};
let index = 0;
let label = {};


let execute = () => {
    let result = {};
    for (let type in config.types) {

        type = config.types[type];
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


        valid = {};
        modify = {};
        index = 0;
        label = {};
        RAM = fileContent.slice();
        result[type] = time;
    };

    console.log(result);
};

let getNextIndex = () => {
    return ++index;
};

let read = (direction, type) => {
    let result;
    switch (type) {
        case "sin cache":
            result = readWithOutCahe(direction);
            break
        case "directo":
            result = directRead(direction);
            break
        case "asociativa":
            result = associativeRead(direction);
            break
        case "asociativa por conjuntos":
            break
    }
    return result;
};


let write = (direction, type, value) => {
    switch (type) {
        case "sin cache":
            result = writeWithOutCahe(direction, value);
            break
        case "directo":
            result = directWrite(direction, value);
            break
        case "asociativa":
            result = associativeWrite(direction, value);
            break
        case "asociativa por conjuntos":
            break
    }
};

let associativeRead = (direction) => {
    let block = Math.trunc(direction / config.k);
    wordD = direction % config.k;
    labelD = Math.trunc(block / config.m);
    let lx = index;
    if (valid[lx] && label[lx] == labelD) {
        time += 0.01;
    } else {
        if (!valid[lx]) {
            time += 0.11;
            valid[lx] = true;
            modify[lx] = false;
        } else {
            lx = getNextIndex();
            if (modify[lx]) {
                time += 0.22;
            } else {
                time += 0.11;
            }
            modify[lx] = false;
        }
    }
    valid[lx] = true;
    label[lx] = labelD;
    return RAM[direction];
};


let associativeWrite = (direction, value) => {
    let block = Math.trunc(direction / config.k);
    let wordD = direction % config.k;
    let labelD = Math.trunc(block / config.m);
    let line = block % config.m;
    let lx = index;
    if (valid[lx] && label[lx] == labelD) {
        modify[lx] = true;
        time += 0.01;
    } else {
        if (!valid[lx]) {
            time += 0.11;
            valid[lx] = true;
        } else {
            lx = getNextIndex();
            if (modify[lx]) {
                time += 0.22;
            } else {
                modify[lx] = true;
                time += 0.11;
            }
            modify[lx] = true;
        }
    }
    valid[lx] = true;
    label[lx] = labelD;
    RAM[direction] = value;
};

let directRead = (direction) => {
    let block = Math.trunc(direction / config.k);
    let wordD = direction % config.k;
    let labelD = Math.trunc(block / config.m);
    let line = block % config.m;
    if (valid[line]) {
        if (label[line] == labelD) {
            time += 0.01;
        } else {
            if (modify[line]) {
                time += 0.22;
                valid[line] = true;
            } else {
                time += 0.11;
                valid[line] = true;
            }
            label[line] = labelD;
        }
    } else {
        time += 0.11;
        valid[line] = true;
        label[line] = labelD;
    }
    return RAM[direction];
};

let directWrite = (direction, value) => {
    let block = Math.trunc(direction / config.k)
    wordD = direction % config.k;
    labelD = Math.trunc(block / config.m);
    line = block % config.m;
    if (valid[line]) {
        if (label[line] == labelD) {
            time += 0.01;
            modify[line] = true;
        } else {
            if (modify[line]) {
                time += 0.22;
                valid[line] = true;
            } else {
                time += 0.11;
                valid[line] = true;
                modify[line] = true;
            }

            label[line] = labelD;
        }
    } else {
        time += 0.11;
        valid[line] = true;
        modify[line] = true;
        label[line] = labelD;
    }
    RAM[direction] = value;
};

let readWithOutCahe = (direction) => {
    time += 0.1;
    return RAM[direction];
};

let writeWithOutCahe = (direction, value) => {
    time += 0.1;
    RAM[direction] = value;
};


execute();