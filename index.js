let _ = require('lodash');
let Manager = require('./FileSystem');
let Promise = require("bluebird");
let FileSystem = new Manager();
let config = require('./config.json');
let data = FileSystem.read("./assets/database.txt");
FileSystem.exportToExcel("example.xlsx");


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

let read = (position, type) => {
    return 0;
};

let write = (position, type) =>{
    return 0;
}