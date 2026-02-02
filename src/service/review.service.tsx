


import { cookies } from "next/headers"
const API_URL = process.env.API_URL
import { revalidatePath } from "next/cache";

export const reviewService = {
    addReview: async function (reviewData: any) {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${API_URL}/api/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(reviewData)
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
    getReview: async function (id:string) {
        const cookieStore = await cookies()

        try {
            const res = await fetch(`${API_URL}/api/review/${id}`, {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache:"no-store"
            })
            const data = await res.json()
            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },

}