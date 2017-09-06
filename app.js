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

app.get('/scrape', async function (req, res) {
	// var url = 'http://www.valdemarsro.dk/surdejsboller/';
	var url = 'http://www.valdemarsro.dk/temaer/nytaar/';

	var recipeData = {
		link: url,
		date: new Date().toISOString(),
		recipes: []
	};

	console.log('ScrapeURLS Start');
	var response = await scrapeURLS(url);
	res.send(response);
	// console.log(response.statusCode);
	console.log('ScrapeURLS End');

	// console.log('Get List Start');
	// recipeData.recipes = Scraper.GetListOfRecipeURLS(response);
	// console.log('Get list End');

	// recipeData.recipes = await scrapeURLS(url);

	// console.log('Start response');
	// res.send(JSON.stringify(recipeData));
	// console.log('End response');

	// FileHelper.WriteFile('output.json', JSON.stringify(recipeData), function (err) {
	// 	res.send(JSON.stringify(recipeData));
	// });
});

/**
 * Scrapes urls from page
 * @param {string} url 
 */
var scrapeURLS = async function (url) {
	console.log('Starting request to: ' + url);
	try {
		var response = await request(url);
		console.log(response);
		console.log('Ending request to: ' + url);
		return response;
	} catch (err) {
		return null;
	}
	// request(url, function (err, res, html) {
	// 	if (err) {
	// 		return null;
	// 	}
	// 	console.log('Ending Request to: ' + url);
	// 	return Scraper.GetListOfRecipeURLS(html);
	// });
};

/**
 * Scrapes page from url
 * @param {String} url 
 */
var scrapePage = async function (url) {
	request(recipeURL, function (err, res, html) {
		if (err) {
			return null;
		}

		return Scraper.GetRecipeFromHTML(html, url);
	});
};

app.listen('3000')
exports = module.exports = app;