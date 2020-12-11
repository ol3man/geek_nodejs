const express = require('express');
const templating = require('consolidate');
const cookieParser = require("cookie-parser");
const app = express();
const Parser = require('rss-parser');
const parser = new Parser();

app.engine('hbs', templating.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", async (request, response) => {
    request.query.rubric && response.cookie("rubric", request.query.rubric);

    response.render("index", {
        title: 'Свежие новости!',
        cardHeader: 'Получи свежие новости!',
        menuHeader: 'Выберите категорию:',
        nameCategory: request.query.rubric,
        news: [],
        lastC: { ...request.query, ...request.cookies }
    });
});


app.post("/getnews", async (request, response) => {
    request.body.rubric && response.cookie("rubric", request.body.rubric);
    let lastView = response.cookie("rubric", request.body.rubric);

    try {
        let feed = await parser.parseURL('http://lenta.ru/rss/news/' + request.body.rubric);
        // console.log({ ...request.query, ...request.cookies })

        response.render("index", {
            title: 'Свежие новости!',
            cardHeader: feed.description,
            menuHeader: 'Выберите категорию:',
            nameCategory: feed.title,
            news: feed.items.slice(1, 11),
            lastC: { ...request.query, ...request.cookies }
        });
    } catch (error) {
        response.status(500);
        response.json("Error");
    }
});


app.listen(3000, () => {
    console.log('listening on 3000');
})
