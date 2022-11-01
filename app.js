const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const restaurantList = require('./restaurant.json');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
  const restaurants = restaurantList.results;

  res.render('index', { restaurants });
});

app.get('/restaurants/:id', (req, res) => {
  const { id } = req.params;
  const restaurant = restaurantList.results.find(
    (item) => item.id.toString() === id
  );

  res.render('show', { restaurant });
});

app.get('/search', (req, res) => {
  const keyword = req.query.q.trim().toLowerCase();
  const restaurants = restaurantList.results.filter(
    (item) =>
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword)
  );

  res.render('index', { restaurants, keyword });
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
