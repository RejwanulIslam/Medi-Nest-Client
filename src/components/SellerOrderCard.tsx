"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { updateOrder } from "@/action/medicine.action"



export default function SellerOrderCard({ data }: { data: any }) {
  const [open, setOpen] = useState(false)

  const statusColor =
    data.order?.status === "Pending"
      ? "bg-yellow-500"
      : data.order?.status === "Shipped"
        ? "bg-blue-500"
        : "bg-green-600"

  const handleStatusChange = async (status: string) => {
    console.log(data.orderId)
    const res = await updateOrder(status, data.orderId)
    console.log(res)
    setOpen(false)
  }

  return (
    <Card className="shadow-md hover:shadow-lg transition">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">
          {data.product?.medicineName}
        </CardTitle>

        <Badge className={statusColor}>{data.order?.status}</Badge>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Quantity</span>
          <span className="font-medium">{data.quantity}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Amount</span>
          <span className="font-semibold text-primary">
            ৳ {data.order?.totalAmount}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Customer</span>
          <span className="font-medium">
            {data.order?.customerId.slice(0, 10)}...
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Order Date</span>
          <span>
            {new Date(data.order?.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Update Button */}
        <div className="relative pt-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpen(!open)}
          >
            Update Status
          </Button>

          {open && (
            <div className="absolute z-10 mt-2 w-full rounded-md border bg-background shadow">
              <button
                className="w-full px-4 py-2 text-left hover:bg-muted"
                onClick={() => handleStatusChange("Pending")}
              >
                🟡 Pending
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-muted"
                onClick={() => handleStatusChange("Processing")}
              >
                🟡 Processing
              </button>

              <button
                className="w-full px-4 py-2 text-left hover:bg-muted"
                onClick={() => handleStatusChange("Shipped")}
              >
                🔵 Shipped
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-muted"
                onClick={() => handleStatusChange("Delivered")}
              >
                🔵 Delivered
              </button>

              <button
                className="w-full px-4 py-2 text-left hover:bg-muted"
                onClick={() => handleStatusChange("Delivered")}
              >
                🟢 Delivered
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}