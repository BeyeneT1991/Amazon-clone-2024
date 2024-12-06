import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    redirect,
} from 'react-router-dom';
import Landing from './Pages/Landing/Landing';
import Auth from './Pages/Auth/Auth';
import Payment from './Pages/Payment/Payment';
import Orders from './Pages/Order/Orders';
import Cart from './Pages/Cart/Cart';
import Results from './Pages/Results/Results';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const stripePromise = loadStripe('pk_test_51QPnHVGOygBTVCbizCj9vOUKGV5Web5FFL2ewWRorxKwenGFUJ2CJkEY8Uf0YPyJVzWY7NPR9LFTK5dePs6wufMV00oviZh6Tk');


function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                    path="/payments"
                    element={
                        <ProtectedRoute
                            msg={"you must log in to pay"}
                            redirect={"/payments"}
                        >
                            <Elements stripe={stripePromise}>
                                <Payment />
                            </Elements>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute
                            msg={"you must log in to access your orders"}
                            redirect={"/orders"}
                        >
                            <Orders />
                        </ProtectedRoute>
                    }
                />
                <Route path="/category/:categoryName" element={<Results />} />
                <Route path="/Products/:ProductId" element={<ProductDetail />} />
                <Route path="/Cart" element={<Cart />} />
            </Routes>
        </Router>
    );
}

export default Routing;