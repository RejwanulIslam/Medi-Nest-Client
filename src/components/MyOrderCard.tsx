"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default function MyOrderCard({ order }: {order:any}) {
  return (
    <Card className="max-w-3xl mx-auto shadow-lg hover:shadow-xl transition-shadow mb-6">
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            Order ID: {order?.id?.slice(0, 8)}...
          </CardTitle>
          <Badge
            className={`${
              order.status === "Pending"
                ? "bg-yellow-500 text-black"
                : order.status === "Completed"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {order.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Placed on: {new Date(order.order.createdAt).toDateString()}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Shipping: {order.order.shippingAddress}
        </p>
        <p className="text-lg text-muted-foreground mt-1">
          status: {order.order.status}
        </p>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        
          <div
            key={order.product.productId}
            className="flex items-center gap-4 border-b border-gray-200 pb-2"
          >
            <img
              src={
                order.product.image ??
                "https://i.ibb.co/yc1DkDrb/colorful-pills-syringe.jpg"
              }
              alt={order.product.medicineName}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <p className="font-semibold">{order.product.medicineName}</p>
              <p className="text-sm text-muted-foreground">
                {order.product.manufacturer}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">৳ {order.product.price}</p>
              <p className="text-sm text-muted-foreground">
                Qty: {order.quantity}
              </p>
              <p className="font-semibold">
                Subtotal: ৳ {order.product.price * order.quantity}
              </p>
            </div>
          </div>
        

       <div className="flex justify-between mt-4 font-bold text-lg">
          <span>Total Amount:</span>
          <span>৳ {order.product.price * order.quantity}</span>
        </div> 

      </CardContent>
    </Card>
  )
}