const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    let product = new Product(req.body);
    try {
        let result = await product.save();
        res.status(201).json({ message: 'Product saved successfully', data: result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getProducts = async (req, res) => {   
    try {
        let products = await Product.find();
        if (products.length > 0) {
            res.status(200).json({status : true, message: 'Product fetched successfully', data: products });
        } else {
            res.status(201).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteProduct = async (req, res) => {   
    try {       
        let result = await Product.deleteOne({_id : req.params.id});
        if (result.deletedCount == 1 ) {
            res.status(200).json({status : true, message: 'Product deleted successfully', data: true });
        } else {
            res.status(201).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.showProduct = async (req, res) => {
    try {
        let result = await Product.findOne({_id : req.params.id});
        if (result ) {
            res.status(200).json({status : true, message: 'Product fetched successfully', data: result });
        } else {
            res.status(201).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {       
        let result = await Product.updateOne(
            {_id : req.params.id},
            {
                $set : req.body
            }
        );
        if (result.modifiedCount > 0 ) {
            res.status(200).json({status : true, message: 'Product updated successfully', data: result });
        } else {
            res.status(201).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};