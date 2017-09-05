'use strict';

/**
 * Simple node express server used for scraping recipes on valdemarsro.dk
 */

var express = require('express');
var request = require('request');
var app = express();

const Scraper = require('./scraper');
const FileHelper = require('./filehelper');

app.get('/', (req, res) => {
	res.send('Index');
});

app.get('/scrape', (req, res) => {
	// var url = 'http://www.valdemarsro.dk/surdejsboller/';
	var url = 'http://www.valdemarsro.dk/temaer/nytaar/';

	var recipeData = {
		link: url,
		date: new Date().toISOString(),
		recipes: []
	};

	request(url, function (error, response, html) {
		if (error) {
			res.send('Error occured while scraping. Error: ' + error);
		}

		var recipeURLS = Scraper.GetListOfRecipeURLS(html);

		for (var i in recipeURLS) {
			var recipeURL = recipeURLS[i];

			console.log('Sending request to: ' + recipeURL);
			request(recipeURL, function (err, resp, recipeHTML) {
				console.log('Recieved request rom: ' + recipeURL);
				if (!err) {
					recipeData.recipes.push(Scraper.GetRecipeFromHTML(recipeHTML, recipeURL));
				}

				if (i === recipeURLS.length) {
					console.log('End of recipes');
					FileHelper.WriteFile('output.json', JSON.stringify(recipeData), (Error) => {
						res.send('Succesfully scraped page: ' + url);
					});
				}
			});
		}
	});
});

app.listen('3000')
exports = module.exports = app;