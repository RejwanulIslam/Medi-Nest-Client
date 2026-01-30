import { MedicineCard } from '@/components/MedicineCard'
import { medicineService } from '@/service/medicine.service'
import { IMedicine } from '@/types'
import React from 'react'

export default async function page() {
    const {data}=await medicineService.getMedicine()
    console.log(data)
  return (
    <div>
        <div className='grid  md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
         data?.map((item:IMedicine)=>(<MedicineCard key={item.id} data={item}></MedicineCard>))   
        }
        </div>

    </div>
  )
}
