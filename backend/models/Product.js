const mongoose = require('mongoose');
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const ProductSchema = new mongoose.Schema({
    name : { 
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Product name must be at least 3 characters long'],
        maxlength: [100, 'Product name must be at most 100 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    category : String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        validate: {
            validator: async function(userId) {
                
                if (!isValidObjectId(userId)) {
                    throw new Error('Invalid userId format');
                }
                // const user = await User.findById(userId);
                // console.log('user', user);
                
                // if (!user) {
                //     console.log(userId);
                //     throw new Error('User not found');
                // }
            },
            message: props => props.reason.message
        }
    },
    company : String
});


module.exports = mongoose.model('products', ProductSchema);