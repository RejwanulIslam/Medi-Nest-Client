import { getCategory } from '@/action/medicine.action'
import { MedicineCard } from '@/components/MedicineCard'
import { categoryService } from '@/service/category.service'
import { medicineService } from '@/service/medicine.service'
import { IMedicine } from '@/types'
import React from 'react'
import AIRecommendations from "@/components/ai/AIRecommendations";

export default async function page() {
    const {data}=await categoryService.getCategory()
    const {data:medData}=await medicineService.getMedicine()
    console.log(data)
  return (
    <div>
        <div className="max-w-7xl mx-auto px-4 pt-8">
            <AIRecommendations context="MediNest medicines and healthcare products" />
        </div>
        <MedicineCard medCategory={data} medData={medData}></MedicineCard>
        
    </div>
  )
}
