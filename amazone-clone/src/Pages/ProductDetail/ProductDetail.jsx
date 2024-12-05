import React, { useEffect, useState } from "react";
import classes from './ProductDetail.module.css'; 
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductUrl } from "../../API/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader"; 

function ProductDetail() {
    const { ProductId } = useParams();
    const [Product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); // Added error state
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${ProductUrl}/Product/${ProductId}`)
            .then((res) => {
                setProduct(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load product details. Please try again.");
                setIsLoading(false);
            });
    }, []);

    return (
    <LayOut>
        {isLoading ? (
            <Loader />
        ) : error ? (
            <p className={classes.errorMessage}>{error}</p>
        ) : (
            <div>
                <ProductCard
                    product={Product}
                    flex={true}
                    renderDesc={true}
                    renderAdd={true}
                />
            </div>
        )}
    </LayOut>
);
}

export default ProductDetail;