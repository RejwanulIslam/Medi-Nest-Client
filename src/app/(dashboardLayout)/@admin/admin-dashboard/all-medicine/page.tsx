import { getCategory } from '@/action/medicine.action'
import { MedicineCard } from '@/components/MedicineCard'
import { categoryService } from '@/service/category.service'
import { medicineService } from '@/service/medicine.service'
import { IMedicine } from '@/types'
import React from 'react'

export default async function page() {
    const { data } = await categoryService.getCategory()
    const { data: medData } = await medicineService.getMedicine()
    console.log(data)
    return (
        <div>
            <MedicineCard medCategory={data} medData={medData}></MedicineCard>
        </div>
    )
}
