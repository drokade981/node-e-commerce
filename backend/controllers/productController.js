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