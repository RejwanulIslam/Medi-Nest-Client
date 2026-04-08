import { getAllOrder } from '@/action/medicine.action'
import AllOrdersClient from './component/AllOrdersClient'

export default async function AllOrdersPage() {
  const allOrders = await getAllOrder()
console.log(allOrders)
  return <AllOrdersClient allOrders={allOrders ?? []} />
}