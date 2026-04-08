import { getAllOrder } from '@/action/medicine.action'
import OrderCard from '@/components/order/MyOrderCard'

export default async function ViwsOllOrder() {
  const allOrders= await getAllOrder()
  console.log(allOrders)
  return (
    <div>
      {
        allOrders?.map((item:any)=>(<OrderCard key={item.id} order={item}></OrderCard>))
      }
    </div>
  )
}
