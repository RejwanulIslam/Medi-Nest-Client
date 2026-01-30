import AddMedicineForm from '@/components/AddMedicineForm'
import { categoryService } from '@/service/category.service'
import { userService } from '@/service/user.service'
import React from 'react'

export default async function page() {
  const {data}= await categoryService.getCategory()
  // console.log('kkkk',data)
  const {data:seation}=await userService.getSeation()
  const userId=seation.user.id
  console.log("first",userId)
  return (
    <div>
      <AddMedicineForm categories={data} userId={userId}></AddMedicineForm>
    </div>
  )
}
