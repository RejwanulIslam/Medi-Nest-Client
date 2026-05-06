import { SelerMedicineCard } from '@/components/Seler-Medicine-Card'
import { medicineService } from '@/service/medicine.service'
import { userService } from '@/service/user.service'

export default async function page() {
  const { data } = await medicineService.getMedicine()

  const { data: seation } = await userService.getSeation()
  const filterByselerId = (data || []).filter((item: any) => item.sellerId == seation.user.id)
  console.log(filterByselerId)

  return (
    <div className='grid md:grid-cols-2 gap-5'>
      {
        filterByselerId.map((item: any) => <SelerMedicineCard key={item.id} medicine={item}></SelerMedicineCard>)
      }
    </div>
  )
}
