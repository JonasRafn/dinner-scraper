'use strict';

/**
 * FileHelper class, used for reading and writing files
 */

var fs = require('fs');

/**
 * Writes content to file.
 * @param {String} filename 
 * @param {String} content 
 * @param {Function} callback 
 */
var writeFile = (filename, content, callback) => {
	fs.writeFile(filename, content, (err) => {
		callback();
	});
};

exports.WriteFile = writeFile;