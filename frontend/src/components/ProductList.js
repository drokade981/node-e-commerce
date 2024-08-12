import React, {useState, useEffect} from 'react'
import config from '../config';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductList = () => {
    const productUrl = config.apiBaseUrl+'/api/';
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        getProducts();
    },[search]);

    const getProducts = async () => {
        try {            
            let url = productUrl+`products`;
            if (search) {
                url += `?search=${search}`;
            }
            let result = await fetch(url, {
                headers : {
                    Authorization : `Bearer `+JSON.parse(localStorage.getItem('token'))
                }
            });
            result = await result.json();   
            setProducts(result.data);
        } catch (error) {
            console.log('err', error);            
        }
    }

    const deleteProduct = async (id) => {
        let result = await fetch(productUrl+'product/'+id, {
            method : 'delete',
            headers : {
                Authorization : `Bearer `+JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        if (result.data) {
            toast.success(result.message);
            setTimeout(()=> {
                getProducts();
            }, 3000)            
        }
    }

    const searchHandle = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className="product-list">
            <h1>product list</h1>
            <input type="text" className="search-box" placeholder="Search" onChange={searchHandle}/>
            <ul>
                <li>Sr. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Action</li>
            </ul>
            {
                (products) ? products.map((item, index) => 
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                         <li>{item.price}</li>
                        <li>{item.category ? item.category : "n/a"}</li>
                        <li>{item.company ?  item.company : "n/a"}</li>
                        <li>
                            <button type="button" onClick={() => deleteProduct(item._id)} >Delete</button>
                            <Link to={"/update-product/"+item._id} >update</Link>
                        </li>
                    </ul>
                ) : 'no'
            }
        </div>
    );
}

export default ProductList
