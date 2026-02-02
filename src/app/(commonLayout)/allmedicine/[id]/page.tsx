import { medicineService } from '@/service/medicine.service'
import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { addCard, getAllOrder } from '@/action/medicine.action';
import DetelsPage from '@/components/DetelsPage';
import { userService } from '@/service/user.service';
export default async function page({ params }: { params: Promise<{ id: string }>}) {
    const {id}= await params
    const{data}=await medicineService.getMdicineById(id)
  const allOrders= await getAllOrder()

    console.log(data)
     const { data:seation } = await userService.getSeation()
        console.log(data)
        const userid = seation.user.id

  return (
   <div>
    <DetelsPage data={data} userid={userid} userOrders={allOrders}></DetelsPage>
   </div>
  )
}
