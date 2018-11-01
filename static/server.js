// server.js
const path = require('path');
const express = require('express');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const middleware = [express.static(path.join(__dirname, 'public'))];
app.use(middleware);

const router = express.Router();
app.use('/', router);
router.get('/', (req, res) => {
  res.render('index');
});

app.listen(9977, () => {
  console.log(`App running at http://localhost:9977`);
});
