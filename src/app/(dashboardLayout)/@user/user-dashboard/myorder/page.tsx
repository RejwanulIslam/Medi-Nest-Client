import MyOrdersCompnent from '@/components/order/MyOrderCompnent'
import { orderService } from '@/service/orderservices'
import { userService } from '@/service/user.service'
import React from 'react'

export default async function page() {
  const {data}=await userService.getSeation()
  const ORDER=await orderService.myOrders(data.user.id)

  console.log("orderdata",ORDER,'jjfjjfjf',data.user.id)
  return (
    <div>
      <MyOrdersCompnent ORDERS={ORDER}></MyOrdersCompnent>
    </div>
  )
}

