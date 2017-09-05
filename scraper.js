'use strict';

var cheerio = require('cheerio');

/**
 * Returns list of urls for recipes from valdermarsro.dk
 * @param {String} html 
 * @returns {Array}
 */
var getListOfRecipeURLS = (html) => {
	var $ = cheerio.load(html);
	var recipes = [];

	$('.category-index').find('.thumb-link-wrapper a').each(function (i, elm) {
		recipes.push($(this).attr('href'));
	});

	return recipes;
};

/**
 * Returns recipe scraped from html
 * @param {String} html 
 * @param {String} url 
 * @returns {Object} recipe
 */
var getRecipeFromHTML = (html, url) => {
	console.log('Start scraping: ' + url);
	var $ = cheerio.load(html);
	var recipe = {
		link: null,
		title: null,
		amount: null,
		time: null,
		ingredients: null,
		steps: null,
		categories: null
	};

	var post = $('.post-recipe');
	var bar = $('.recipe-bar');

	recipe.link = url;
	recipe.title = post.find('h2').text();
	recipe.amount = post.find('.recipe-stats.left').text().substring(2);
	recipe.time = post.find('.recipe-stats.right').text().substring(2);


	post.find('.ingredientlist li').each(function (i, elm) {
		if (recipe.ingredients === null) {
			recipe.ingredients = [];
		}
		recipe.ingredients.push($(this).text());
	});

	post.find('[itemprop="recipeInstructions"] p').each(function (i, elm) {
		if (recipe.steps === null) {
			recipe.steps = [];
		}
		recipe.steps.push($(this).text());
	});

	bar.find('a').each(function (i, elm) {
		if (recipe.categories === null) {
			recipe.categories = [];
		}
		recipe.categories.push($(this).text());
	});

	console.log('End scraping: ' + url);
	return recipe;
};

exports.GetListOfRecipeURLS = getListOfRecipeURLS;
exports.GetRecipeFromHTML = getRecipeFromHTML;