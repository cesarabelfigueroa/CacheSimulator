let fs = require("fs");
let xlsx = require("node-xlsx");
let _ = require('lodash');
class FileSystem {
    read(path) {
        return _.map(fs.readFileSync(path).toString().split("\n"), n => +n);
    }
    exportToExcel(path) {
		const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];

		let buffer = xlsx.build([{name: "", data: data}]); 
		return fs.writeFileSync(path, buffer);
    }
}
module.exports = FileSystem;