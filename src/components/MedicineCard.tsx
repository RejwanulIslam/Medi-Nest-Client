
"use client"

import { getMedicine } from "@/action/medicine.action"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { useEffect, useState } from "react"

export function MedicineCard({ medCategory, medData }: { medCategory: string[], medData: any }) {
  const [data, setData] = useState<any[]>([])
  const [serch, setSerch] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [manufacturer, setManufacturer] = useState("")
  const [category, setCategory] = useState("")

const manufacturers = Array.from(
  new Set(medData.map((item: any) => item.manufacturer))
)

const categorys = Array.from(
  new Set(medCategory.map((item: any) => item.categorieName))
)

console.log("manufacturer",categorys)


  const getMedicines = async () => {
    const data = await getMedicine({
      serch,
      minPrice,
      maxPrice,
      manufacturer,
      category
    })
    setData(data)
  }

  useEffect(() => {
    getMedicines()
  }, [serch, minPrice, maxPrice, manufacturer,category])

  return (
    <div className="space-y-6">
      {/* ===== Filter Section ===== */}
      <div className="grid gap-4 rounded-xl border p-4 md:grid-cols-4">
        {/* Search */}
        <Input
          placeholder="Search medicine..."
          value={serch}
          onChange={(e) => setSerch(e.target.value)}
        />

        {/* Min Price */}
        <Input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        {/* Max Price */}
        <Input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        {/* Manufacturer */}
        <Select
          value={manufacturer}
          onValueChange={(value) =>
            setManufacturer(value === "all" ? "" : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Manufacturer" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {
              
              manufacturers.map((item: any) => (<SelectItem key={item} value={`${item}`}>{item}</SelectItem>))
            }
          </SelectContent>
        </Select>

        {/* category */}
        <Select
          value={category}
          onValueChange={(value) =>
            setCategory(value === "all" ? "" : value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="category" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {
              
              categorys.map((item: any) => (<SelectItem key={item} value={`${item}`}>{item}</SelectItem>))
            }
          </SelectContent>
        </Select>
      </div>

      {/* ===== Medicine Grid ===== */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.map((data: any) => (
          <Card
            key={data.id}
            className="relative mx-auto w-full max-w-sm overflow-hidden transition hover:shadow-lg"
          >
            {/* Image */}
            <div className="relative aspect-video">
              <img
                src={data.image ?? "https://avatar.vercel.sh/medicine"}
                alt={data.medicineName}
                className="h-full w-full object-cover"
              />

              {data.stock > 0 ? (
                <Badge className="absolute right-2 top-2 bg-green-600">
                  In Stock
                </Badge>
              ) : (
                <Badge className="absolute right-2 top-2 bg-red-600">
                  Out of Stock
                </Badge>
              )}
            </div>

            <CardHeader>
              <CardTitle className="text-lg">
                {data.medicineName}
              </CardTitle>
              <CardDescription>
                Manufacturer: {data.manufacturer}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex items-center justify-between">
              <p className="text-lg font-semibold">৳ {data.price}</p>

              <Button disabled={data.stock === 0}>
                <Link href={`/allmedicine/${data.id}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
