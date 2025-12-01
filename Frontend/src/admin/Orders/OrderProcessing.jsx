import React from 'react'; // <-- Ensure React is imported if you use JSX
import OrderViewTemplate from './OrderViewTemplate';

const OrderProcessing = () => (
    <OrderViewTemplate 
        status="Confirmed" 
        pageTitle="Confirmed Orders (Processing)" 
    />
);

export default OrderProcessing; // <-- This is the crucial line that was missing or incorrect