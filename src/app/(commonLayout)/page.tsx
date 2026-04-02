// import { Hero7 } from "@/components/hero7";

import { Hero7 } from "@/components/hero7";
import HomeFooters from "@/components/HomeFooters";
import MedicineHomeCard from "@/components/MedecineHomeCard";
import { medicineService } from "@/service/medicine.service";
import Image from "next/image";

export default async function Home() {
  const meddata = await medicineService.getMedicine()
  let slicemeddata = []
  if (meddata.data?.length >= 6) {
    slicemeddata = meddata?.data?.slice(0, 6)
  }
  if (meddata.data?.length < 6) {
    slicemeddata = meddata?.data
  }

  return (
    <div className="grid gap-5">
      <Hero7 ></Hero7>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          slicemeddata?.map((item: any) => <MedicineHomeCard key={item.id} sixdata={item}></MedicineHomeCard>)
        }
      </div>

      <HomeFooters></HomeFooters>

    </div>
  );
}
