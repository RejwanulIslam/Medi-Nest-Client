import { UpdateMedicineForm } from '@/components/Update-Medicine-From';
import { medicineService } from '@/service/medicine.service'
import React from 'react'

export default async function page({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;
  console.log(id)
  const { data } = await medicineService.getMdicineById(id);
  console.log(data);

  return (
    <div>
      <UpdateMedicineForm medicine={data} id={id} />
    </div>
  );
}