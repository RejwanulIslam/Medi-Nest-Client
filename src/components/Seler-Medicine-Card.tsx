"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { addCard, deleteMedicine } from "@/action/medicine.action";

export const SelerMedicineCard= ({medicine}:{medicine:any}) => {
  if (!medicine) return <p>No medicine data</p>;

  const handledelete=async(id:string)=>{
    const res=await deleteMedicine(id)
  }


  return (
    <Card className=" shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-col items-center space-y-2">
        <CardTitle className="text-xl font-bold">{medicine.medicineName || "No Name"}</CardTitle>
        <p className="text-sm text-gray-500">{medicine?.categorie?.categorieName || "No Category"}</p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col space-y-2">
          <img
            src={medicine.image || "https://via.placeholder.com/400x200"}
            alt={medicine.medicineName || "Medicine Image"}
            className="w-full h-48 object-cover rounded-md"
          />
          <p><strong>Manufacturer:</strong> {medicine?.manufacturer || "N/A"}</p>
          <p><strong>Price:</strong> ৳{medicine?.price ?? 0}</p>
          <p><strong>Stock:</strong> {medicine?.stock ?? 0}</p>
          <p className="text-sm text-gray-700">{medicine?.detels || "No Details"}</p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Link href={`/seler-dashboard/manage-medicine/${medicine.id}`}> <Button variant="outline">Update</Button></Link>
       
        <Button variant="destructive" onClick={()=>handledelete(medicine.id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};