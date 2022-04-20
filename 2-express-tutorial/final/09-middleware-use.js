const express = require('express');
const app = express();
const logger = require('./logger');
const authorize = require('./authorize');
// req => middleware => res
// app.use(logger);
app.use([logger, authorize]);
// app.use('/api', logger);
// api/home/about/products
app.get('/', (req, res) => {
	return res.send('Home');
});
app.get('/about', (req, res) => {
	return res.send('About');
});
app.get('/api/products', (req, res) => {
	return res.send('Products');
});
app.get('/api/items', (req, res) => {
	console.log(req.user);
	return res.send('Items');
});

app.listen(5000, () => {
	console.log('Server is listening on port 5000....');
});
