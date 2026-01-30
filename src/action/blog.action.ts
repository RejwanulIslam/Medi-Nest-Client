"use server"
import { medicineService } from "@/service/medicine.service"
import { CreateMedicineInput } from "@/types"
import { updateTag } from "next/cache"


export const getMedicine=async()=>{
    return await medicineService.getMedicine()
}
export const createMedicine=async(data:CreateMedicineInput)=>{
    const res=await medicineService.createMedicine(data)
    updateTag("medicine-post")
    return res
}