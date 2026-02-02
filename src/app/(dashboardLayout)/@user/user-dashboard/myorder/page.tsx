import { getAllOrder } from '@/action/medicine.action'
import MyOrderCard from '@/components/MyOrderCard'
import { userService } from '@/service/user.service'
import React from 'react'

export default async function page() {
  const allOrders = await getAllOrder()
  const { data } = await userService.getSeation()
  console.log(allOrders)
  const myOrders = allOrders.filter((item: any) => item.order.customerId === data.user.id)
  console.log("first", myOrders)
  return (
    <div>
      {
        myOrders.length == 0 && <h1 className='font-bold text-center'>NO Order Fond</h1>

      }
      {
        myOrders.map((item: any) => (<MyOrderCard order={item}></MyOrderCard>))
      }
    </div>
  )
}
