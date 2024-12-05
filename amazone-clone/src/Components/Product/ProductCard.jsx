import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import classes from './product.module.css';
import { Link } from 'react-router-dom'; // Fixed Link import
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/actiontype';

function ProductCard({ product = {}, flex, renderDesc, renderAdd }) {
    // Destructure product with fallback values
    const { image, title, id, rating = {}, price, description } = product;
    const { rate = 0, count = 0 } = rating; // Default rating structure

    const [state, dispatch] = useContext(DataContext);

    const addToCart = () => {
        if (dispatch) {
            dispatch({
                type: Type.ADD_TO_BASKET,
                item: { image, title, id, price, description },
            });
        } else {
            console.error('Dispatch function is undefined!');
        }
    };

    return (
        <div className={`${classes.card_container} ${flex ? classes.product_flexed : ''}`}>
            {/* Link to product detail */}
            <Link to={`/product/${id}`}>
                <img src={image || 'https://via.placeholder.com/150'} alt={title || 'Product Image'} />
            </Link>
            <div>
                <h3>{title || 'No Title Available'}</h3>
                {/* Render description if renderDesc is true */}
                {renderDesc && <div style={{ maxWidth: '750px' }}>{description || 'No Description Available'}</div>}
                <div className={classes.rating}>
                    {/* Rating */}
                    <Rating value={rate} precision={0.1} readOnly />
                    {/* Count */}
                    <small>{count || 0}</small>
                </div>
                <div>
                    {/* Price */}
                    <CurrencyFormat amount={price || 0} />
                </div>
                {/* Render "add to cart" button if renderAdd is true */}
                {renderAdd && (
                    <button className={classes.button} onClick={addToCart}>
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}

export default ProductCard;