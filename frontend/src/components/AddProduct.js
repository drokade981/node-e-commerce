import React, {useState} from 'react'
import config from '../config';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const productUrl = config.apiBaseUrl+'/api/products';
    const [formState, setFormState] = useState('')

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

    const addProduct = async(e) => {
    //    if(!name || !price || !company || !category)
    //     { 
    //         // errors.status = true;
    //         return false
    //     }
        e.preventDefault();
        if (validate()) {
            const userId = JSON.parse(localStorage.getItem('user')).user._id;
            console.log(name, price, category, company, userId);
            let result = await fetch(productUrl, 
            {
                method : 'post',
                body : JSON.stringify({name, price, category, company, userId}),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            result = await result.json();
            
            setFormState('Product added successfully');
            setTimeout(()=> {
                navigate('/');
            }, 3000)
        }

    }
    return (
        <div>
            <div className="product">
                <h1>Add Product</h1>
                <h3 className="form_status text-success">{formState}</h3>
                <input type="text" className="inputBox" onChange={(e) => {setName(e.target.value)}} value={name} placeholder="Enter name" />
                {errors.name && <span className="invalid-input">{errors.name}</span>}
                <input type="text" className="inputBox" onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Enter price" />
                {errors.price && <span className="invalid-input">{errors.price}</span>}
                <input type="text" className="inputBox" onChange={(e) => setCategory(e.target.value)} value={category} placeholder="Enter Category" />
                {errors.category && <span className="invalid-input">{errors.category}</span>}
                <input type="text" className="inputBox" onChange={(e) => setCompany(e.target.value)} value={company} placeholder="Enter Company" />
                {errors.company && <span className="invalid-input">{errors.company}</span>}
                <button className="appButton" type="button" onClick={addProduct} >Add Product</button>
            </div>
        </div>
    )
}

export default AddProduct
