import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import ProductCard from './ProductCard'; 
import classes from './product.module.css';
import Loader from '../Loader/Loader';

function Product() {
    const [products, setProducts] = useState([]); 
    const [isLoading, setLoading] = useState(true); // Initialize with `true` since we're loading data

    useEffect(() => {
        setLoading(true); // Start loading before fetching data
        axios
            .get('https://fakestoreapi.com/products')
            .then((res) => {
                setProducts(res.data); // Set the products data from the API response
                setLoading(false); // Stop loading after data is fetched
            })
            .catch((err) => {
                console.error(err); // Log errors if any
                setLoading(false); // Stop loading even if there’s an error
            });
    }, []);

    return (
        isLoading ? (
            <Loader />
        ) : (
            <section className={classes.product_container}>
                {products?.map((singleProduct) => (
                    <ProductCard 
                        renderAdd={true} 
                        product={singleProduct} 
                        key={singleProduct.id} 
                    />
                ))}
            </section>
        )
    );
}

export default Product;