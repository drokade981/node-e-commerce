const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    let product = new Product(req.body);
    try {
        let result = await product.save();
        res.status(201).json({ message: 'Ptoduct saved successfully', data: result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProduct = async (req, res) => {
   
    try {
        let products = await Product.find();
        if (products.length > 0) {
            res.status(200).json({status : true, message: 'Ptoduct fetched successfully', data: products });
        } else {
            res.status(201).json({ message: 'Ptoduct not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};