import React, {useState, useEffect} from 'react'
import config from '../config';
import { useNavigate, useParams  } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProductComponent = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const productUrl = config.apiBaseUrl+'/api/product/';
    const [formState, setFormState] = useState('');
    const params = useParams();

    useEffect(() => {
        getProduct();        
    },[]);

    const validate = () => {
        const errors = {};
    
        if (!name) {
            errors.name = 'Name is required';
        } else if (name.length < 3) {
            errors.name = 'Name must be at least 3 characters';
        }
    
        if (!price) {
            errors.price = 'price is required';
        }
    
        if (!category) {
            errors.category = 'category is required';
        } else if (category.length < 3) {
            errors.category = 'category must be at least 3 characters';
        }

        if (!company) {
            errors.company = 'company is required';
        } else if (company.length < 3) {
            errors.company = 'company must be at least 3 characters';
        }
    
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const getProduct = async () => {
        let product = await fetch(productUrl+params.id, {
            method : 'get',
            headers : {
                Authorization : `Bearer `+JSON.parse(localStorage.getItem('token'))
            }
        });

        product = await product.json();
        if (product.status) {
            setName(product.data.name);
            setPrice(product.data.price);
            setCategory(product.data.category);
            setCompany(product.data.company);
        }
        
    }

    const updateProduct = async(e) => {
    //    if(!name || !price || !company || !category)
    //     { 
    //         // errors.status = true;
    //         return false
    //     }
        e.preventDefault();
        if (validate()) {
            const userId = JSON.parse(localStorage.getItem('user'))._id;

            let result = await fetch(productUrl+params.id, 
            {
                method : 'put',
                body : JSON.stringify({name, price, category, company, userId}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer `+JSON.parse(localStorage.getItem('token'))
                },
            });
            result = await result.json();
            if (result.status) {
                toast.success(result.message);
            } else {
                toast.warn(result.message);
            }
            setTimeout(()=> {
                navigate('/products');
            }, 3000)
        }

    }
    return (
        <div>
            <div className="product">
                <h1>Update Product</h1>
                <input type="text" className="inputBox" onChange={(e) => {setName(e.target.value)}} value={name} placeholder="Enter name" />
                {errors.name && <span className="invalid-input">{errors.name}</span>}
                <input type="text" className="inputBox" onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Enter price" />
                {errors.price && <span className="invalid-input">{errors.price}</span>}
                <input type="text" className="inputBox" onChange={(e) => setCategory(e.target.value)} value={category} placeholder="Enter Category" />
                {errors.category && <span className="invalid-input">{errors.category}</span>}
                <input type="text" className="inputBox" onChange={(e) => setCompany(e.target.value)} value={company} placeholder="Enter Company" />
                {errors.company && <span className="invalid-input">{errors.company}</span>}
                <button className="appButton" type="button" onClick={updateProduct} >Update Product</button>
            </div>
        </div>
    )
}

export default UpdateProductComponent
