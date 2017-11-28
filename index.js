let _ = require('lodash');
let Manager = require('./core/FileSystem');
let Promise = require("bluebird");
let FileSystem = new Manager();
let config = require('./config.json');
let RAM = FileSystem.read("./assets/database.txt");
let CACHE = {};


let sort = (data) => {
    for (const type in config.types) {
        for (let i = 0; i < config.ram - 1; i++) {
            for (let j = i + 1; i < config.ram; j++) {
                if (read(i, config.type.types[type]) > read(j, config.type.types[type])) {
                    let value = read(i, config.type.types[type]);
                    write(i, config.type.types[type], read(j, config.type.types[type]));
                    write(j, config.type.types[type], value);
                }
            }
        }
    }

};

let read = (direction, type) => {
    let result;
    switch (type) {
        case "sin cache":

            break
        case "directa":
            t+=0.1;
            result = directRead(direction);
            break
        case "asociativa":
            break
        case "asociativa por conjuntos":
            break
    }
    return result;
};

let write = (direction, type) => {
    return 0;
};

let directRead = (direction) => {
    let pd = math.trunc(direction/config.k), ed= math.trunc(direction/config.m);
    let line = d % config.m;

    if (true) {
        return CACHE[line][pd];
    } else {
        
    }
    
};
