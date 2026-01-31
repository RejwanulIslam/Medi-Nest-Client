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
export default async function page({ params }: { params: Promise<{ id: string }>}) {
    const {id}= await params
    const{data}=await medicineService.getMdicineById(id)
    console.log(data)
  return (
     <div className="container mx-auto max-w-5xl py-10">
      <Card>
        <CardContent className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">

          <div className="relative">
            <img
              src={data?.image ?? "https://i.ibb.co.com/yc1DkDrb/colorful-pills-syringe.jpg"}
              alt={data.medicineName}
              className="w-full rounded-lg object-cover"
            />

            {data.stock > 0 ? (
              <Badge className="absolute left-3 top-3 bg-green-600">
                In Stock
              </Badge>
            ) : (
              <Badge className="absolute left-3 top-3 bg-red-600">
                Out of Stock
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl">
                {data.medicineName}
              </CardTitle>
            </CardHeader>

            <p className="text-sm text-muted-foreground">
              Manufacturer: <span className="font-medium">{data.manufacturer}</span>
            </p>

            <div className="flex gap-2">
              <Badge variant="secondary">
                Category ID: {data.categorieName}
              </Badge>
            </div>

            <p className="text-3xl font-bold text-primary">
              ৳ {data.price}
            </p>

            <Button
              size="lg"
              disabled={data.stock === 0}
              className="w-full md:w-fit"
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>

        <Separator />

        {/* ===== Description Section ===== */}
        <CardContent className="p-6">
          <h3 className="mb-2 text-lg font-semibold">
            Medicine Details
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {data.detels}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
