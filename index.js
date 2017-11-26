let _ = require('lodash');
let Manager = require('./core/FileSystem');
let Promise = require("bluebird");
let FileSystem = new Manager();
let config = require('./config.json');
let RAM = FileSystem.read("./assets/database.txt");
let CACHE = {};


let sort = (data) => {
    for (let i = 0; i < config.ram - 1; i++) {
        for (let j = i + 1; i < config.ram; j++) {
            if (read(i, config.type) > read(j, config.type)) {
                let value = read(i, config.type);
                write(i, config.type, read(j, config.type));
                write(j, config.type, value);
            }
        }
    }
};

let read = (direction, type) => {
	


};

let write = (direction, type) =>{
    return 0;
}


