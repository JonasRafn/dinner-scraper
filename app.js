var express = require('express');
var fs = require('fs');
var request = require('request');
var rp = ('request-promise');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', (req, res) => {

	var url = 'http://www.valdemarsro.dk/surdejsboller/';

	request(url, function (error, response, html) {
		if (error) {
			res.send('Error occured while scraping. Error: ' + error);
		}

		var $ = cheerio.load(html);
		var recipe = {
			title: '',
			ingredients: [],
			steps: [],
			categories: []
		};

		var post = $('.post-recipe');
		var bar = $('.recipe-bar');

		recipe.title = post.find('h2').text();

		var ingredients = post.find('.ingredientlist li');


		post.find('.ingredientlist li').each(function (i, elm) {
			recipe.ingredients.push($(this).text());
		});

		post.find('[itemprop="recipeInstructions"] p').each(function (i, elm) {
			recipe.steps.push($(this).text());
		});

		bar.find('a').each(function (i, elm) {
			recipe.categories.push($(this).text());
		});

		fs.writeFile('output.json', JSON.stringify(recipe), (err) => {
			res.send('Succesfully scraped page: ' + url);
		});
	});

});

app.listen('3000')
exports = module.exports = app;