import React from 'react';
import numeral from 'numeral';

const CurrencyFormat = ({ amount }) => {
    if (amount == null) return <div>Invalid Amount</div>; // Handle null/undefined cases
    const formattedAmount = numeral(amount).format('$0,0.00');
    return <div>{formattedAmount}</div>;
};

export default CurrencyFormat;