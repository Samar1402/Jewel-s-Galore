import React from 'react'; 
import OrderViewTemplate from './OrderViewTemplate';

const OrderProcessing = () => (
    <OrderViewTemplate 
        status="Confirmed" 
        pageTitle="Confirmed Orders (Processing)" 
    />
);

export default OrderProcessing; 