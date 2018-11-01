// server.js
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const router = express.Router();
router.all('/', (request, response) =>
  response.render('index', {
    data: request.body || {},
  })
);

const middleware = [
  express.static(path.join(__dirname, 'public')),
  bodyParser.urlencoded({extended: false}),
  cors(),
  router,
];
app.use(middleware);

app.listen(9977, () => console.log(`App running at http://localhost:9977`));
