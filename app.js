require('dotenv').config;
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

const routerAuth = require('./routers/auth.js');

const routerPost = require('./routers/posts.js');

const routerTags = require('./routers/tags.js');

const routerCategories = require('./routers/categories.js');

const notFound = require('./middlewares/notFound.js');

const serverError = require('./middlewares/serverError.js');

const badRequest = require('./middlewares/badRequest.js');

app.use(express.json());

app.use('/auth', routerAuth);

app.use('/posts', routerPost);

app.use('/tags', routerTags);

app.use('/categories', routerCategories);

app.use(notFound);

app.use(badRequest);

app.use(serverError);

app.listen(port, () => {
    console.log('Server online')
});