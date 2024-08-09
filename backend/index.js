const express = require('express');
const cors = require('cors');
require('./db/config');

const productRoutes = require('./routes/productRoutes');
const authtRoutes = require('./routes/authRoutes');


const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, resp) => {
    resp.send('app is working');
});


app.use('/api', productRoutes);
app.use('/api', authtRoutes);


app.listen(5000);