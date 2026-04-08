import { getAllOrder } from '@/action/medicine.action'
import SellerOrderCard from '@/components/SellerOrderCard'
import { userService } from '@/service/user.service'
import React from 'react'

export default async function page() {
  const allOrders = await getAllOrder()
  const { data } = await userService.getSeation()
  console.log(allOrders)
  const myOrders = allOrders.filter((item: any) => item.product.sellerId === data.user.id)
  console.log("first", allOrders)
  console.log("seler", myOrders)
  return (
    <div>
      {
        myOrders.map((item: any) => (<SellerOrderCard key={item.id} data={item}></SellerOrderCard>
        ))
      }
    </div>
  )
}
