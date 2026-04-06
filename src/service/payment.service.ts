import { OrderItem } from "@/app/payment/payment.interface"
import { cookies } from "next/headers"


export const paymentService = {
    CreatePayment: async function ({
        totalAmount,
        shippingAddress,
        phone,
        name,
        items,
    }: {
        items: OrderItem[]
        totalAmount: number
        shippingAddress: string
        phone: string
        name: string
    }) {

        try {
            const cookieStore = await cookies()

            const res = await fetch(
                "http://localhost:5000/api/payment/create-intent",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: cookieStore.toString()
                    },
                    body: JSON.stringify({
                        totalAmount,
                        shippingAddress,
                        phone,
                        name,
                        items,
                    }),
                }
            )

            const data =await res.json()
            return { data: data, error: null, status: 200 }



        } catch (err: any) {
            return {
                data: null,
                error: { message: err.message || "Error:Something is worng" }
            }
        }
    }

}