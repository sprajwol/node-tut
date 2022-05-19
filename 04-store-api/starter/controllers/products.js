const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
	const search = 'ab';
	const products = await Product.find({})
		.sort('name')
		.select('name price')
		.limit(10)
		.skip(1);
	res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
	const { featured, company, name, sort, fields } = req.query;
	const queryObject = {};
	if (featured) {
		queryObject.featured = featured === 'true' ? true : false;
	}
	if (company) {
		queryObject.company = company;
	}
	if (name) {
		queryObject.name = { $regex: name, $options: 'i' };
	}
	// console.log(queryObject)
	let result = Product.find(queryObject);
	//sort
	if (sort) {
		const sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}

	if (fields) {
		const fieldsList = fields.split(',').join(' ');
		result = result.select(fieldsList);
	}

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.page) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);
	// 23
	// 4 7 7 7 2

	const products = await result;
	res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
	getAllProductsStatic,
	getAllProducts,
};
