import React from 'react'; 
import OrderViewTemplate from './OrderViewTemplate'; 

const OrderDispatch = () => (
    <OrderViewTemplate 
        status="Dispatched" 
        pageTitle="Dispatched Orders (In Transit)" 
    />
);

export default OrderDispatch;