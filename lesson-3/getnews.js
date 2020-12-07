// получаем последние новости с IXBT.com
var request = require('request');
var cheerio = require('cheerio');
request('http://www.ixbt.com/', function (error, response, html) {
    if (!error && response.statusCode === 200) {
        // console.log(html)
        var $ = cheerio.load(html);
        $('.js-news-block .rightnewslist-container ul li a.hyphens').each(function(i, element){
            console.log($(this).text().trim());
        });
    } else {
        console.log(error, response.statusCode);
    }
});
