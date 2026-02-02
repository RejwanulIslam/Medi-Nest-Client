import { getAllOrder } from '@/action/medicine.action'
import MyOrderCard from '@/components/MyOrderCard'
import { userService } from '@/service/user.service'
import React from 'react'

export default async function ViwsOllOrder() {
  const allOrders= await getAllOrder()
  console.log(allOrders)
  return (
    <div>
      {
        allOrders.map((item:any)=>(<MyOrderCard key={item.id} order={item}></MyOrderCard>))
      }
    </div>
  )
}
