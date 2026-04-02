import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
const API_URL = process.env.API_URL

export const orderService = {
    CreateOrder: async function (orderData: any) {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(orderData)
            })
            const data = await res.json()
            if (data.error) {
                return {
                    data: null,
                    error: { message: data.error || "Error:card is not added" }
                }
            }

            return { data: data, error: null }
        } catch (error: any) {
            return {
                data: null,
                error: { message: error.message || "Error:Something is worng" }
            }
        }
    },
    getAllOrder: async function () {
        const cookieStore = await cookies()

        try {
            const res = await fetch(`${API_URL}/api/orders`, {
                headers: {

                    Cookie: cookieStore.toString()
                },
                cache: "no-store"
            },

            )

            const data = await res.json()

            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },

    // get orders by custumer id
    myOrders: async function (id: string) {
        const cookieStore = await cookies()

        try {
            const res = await fetch(`${API_URL}/api/orders/${id}`, {
                method: "GET",
                headers: {
                    "Cookie": cookieStore.toString(),
                    "Content-Type": "application/json",
                },
                cache: "no-store"
            })

            // check response
            if (!res.ok) {
                const errorText = await res.text();
                console.error("API Error Response:", errorText);
                return { data: null, error: errorText };
            }
            const result = await res.json()
            return { data: result, error: null }
        } catch (error: any) {
            return { data: null, error: { message: error.message } }
        }
    },


    uppdateOrder: async function (status: string, id: string) {
        const cookieStore = await cookies()

        try {
            const res = await fetch(`${API_URL}/api/orders`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",

                    Cookie: cookieStore.toString()
                },

                body: JSON.stringify({ status, id }),


                cache: "no-store"
            },

            )

            const data = await res.json()
            revalidatePath("/seller-dashboard/viwsorder")

            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },
}