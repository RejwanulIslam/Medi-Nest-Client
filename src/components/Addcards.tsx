
"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { crateOrder, deleteCard } from "@/action/medicine.action"

export default function Addcard({ product }: { product: any[] }) {
  const [open, setOpen] = useState(false)
  const [shippingAddress, setShippingAddress] = useState("")
  console.log("product1234", product)

  const totalAmount = product.reduce((total, item) => {
    const price = item.product?.price || 0; // product এর price
    const quantity = item.quantity || 0;

    return total + (price * quantity);
  }, 0);



  const postOrder = async () => {
    const orderData = {
      shippingAddress,
      totalAmount,
      items: product.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    }


    const res = await crateOrder(orderData)



    const idsToDelete = product.map(item => item.id);
    const result = await deleteCard(idsToDelete);


    setOpen(false)
  }

  return (
    <>
      <h1 className="text-center font-bold mb-4">My Cart</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {product.map((item: any) => (
          <Card key={item.id} className="max-w-sm shadow-md">
            <CardHeader className="p-0">
              <img
                src={
                  item.product.image ??
                  "https://i.ibb.co/yc1DkDrb/colorful-pills-syringe.jpg"
                }
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>

            <CardContent className="p-4">
              <CardTitle>{item.product.medicineName}</CardTitle>
              <p>৳ {item.product.price}</p>
              <p className="text-sm text-muted-foreground">
                Qty: {item.quantity}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="w-full mt-8" onClick={() => setOpen(true)}>
        Check Out
      </Button>

      {/* 🔥 Checkout Modal */}
      {/* Dialog */}

    </>
  )
}


//  <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="max-w-lg">
//         <DialogHeader>
//           <DialogTitle>Confirm Your Order</DialogTitle>
//         </DialogHeader>

//         {/* Order Summary */}
//         <div className="space-y-3">
//           {product.map((item: any) => (
//             <div
//               key={item.id}
//               className="flex justify-between text-sm"
//             >
//               <span>
//                 {item.product.medicineName} × {item.quantity}
//               </span>
//               <span>
//                 ৳ {item.product.price * item.quantity}
//               </span>
//             </div>
//           ))}

//           <hr />

//           <div className="flex justify-between font-bold">
//             <span>Total</span>
//             <span>৳ {totalAmount}</span>
//           </div>

//           {/* Shipping Address */}
//           <div className="space-y-2">
//             <label className="text-sm font-medium">
//               Shipping Address
//             </label>
//             <Input
//               placeholder="Enter your full address"
//               value={shippingAddress}
//               onChange={(e) => setShippingAddress(e.target.value)}
//             />
//           </div>

//           <Button
//             className="w-full mt-4"
//             disabled={!shippingAddress}
//             onClick={postOrder}
//           >
//             Confirm Order
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog> 