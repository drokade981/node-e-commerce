const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/user');

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, resp) => {
    resp.send('app is working');
});
app.post('/register', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    resp.send(result);
});
// const productSchema = new mongoose.Schema({});
// const product = mongoose.model('products', productSchema);
// const data = await product.find();
 

app.listen(5000);