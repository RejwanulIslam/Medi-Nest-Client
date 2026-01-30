import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IMedicine } from "@/types"

export function MedicineCard({data}:{data:IMedicine}) {
  return (
     <Card className="relative mx-auto w-full max-w-sm overflow-hidden">
      
      {/* ===== Image Section ===== */}
      <div className="relative aspect-video">
        <img
          src={data.image ?? "https://avatar.vercel.sh/medicine"}
          alt={data.medicineName}
          className="h-full w-full object-cover"
        />

        {/* Stock Badge */}
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

      {/* ===== Content ===== */}
      <CardHeader>
        <CardTitle className="text-lg">
          {data.medicineName}
        </CardTitle>

        <CardDescription className="text-sm">
          Manufacturer: {data.manufacturer}
        </CardDescription>
      </CardHeader>

      {/* ===== Footer ===== */}
      <CardFooter className="flex items-center justify-between">
        <p className="text-lg font-semibold">
          ৳ {data.price}
        </p>

        <Button disabled={data.stock === 0}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
