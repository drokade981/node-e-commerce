import React, {useState, useEffect} from 'react'
import config from '../config';


const ProductList = () => {
    const productUrl = config.apiBaseUrl+'/api/products';
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts();
    },[]);

    const getProducts = async () => {
        let result = await fetch(productUrl);
        result = await result.json();
        setProducts(result.data);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(productUrl+'/'+id, {
            method : 'delete'
        });
        result = await result.json();
        if (result.data) {
            alert('product deleted successfully');
            getProducts();
        }
    }
    
    return (
        <div className="product-list">
            <h1>product list</h1>
            <ul>
                <li>Sr. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Action</li>
            </ul>
            {
                products.length ? products.map((item, index) => 
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                         <li>{item.price}</li>
                        <li>{item.category ? item.category : "n/a"}</li>
                        <li>{item.company ?  item.company : "n/a"}</li>
                        <li><button type="button" onClick={() => deleteProduct(item._id)} >Delete</button></li>
                    </ul>
                ) : 'no'
            }
        </div>
    );
}

export default ProductList
