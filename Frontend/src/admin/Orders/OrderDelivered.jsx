import React from 'react'
import OrderViewTemplate from './OrderViewTemplate'; 
const OrderDelivered = () => {
  return (
    <div>
      <OrderViewTemplate
        status="Delivered" 
        pageTitle="Delivered Orders (Completed)" 
      />
    </div>
  )
}

export default OrderDelivered
