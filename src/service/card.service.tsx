import { cookies } from "next/headers"
const API_URL = process.env.API_URL
import { revalidatePath } from "next/cache";

export const cardService = {
    addCard: async function (cardData: any) {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${API_URL}/addcard`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(cardData)
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
    getcard: async function () {
        try {
            const res = await fetch(`${API_URL}/getcard`)
            const data = await res.json()
            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },
    deleteCard: async function (ids: string[]) {
                    const cookieStore = await cookies()

        try {
            const res = await fetch(`${API_URL}/deletecard`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify({ids})
            })
            const data = await res.json()

            revalidatePath("/user-dashboard/deletecard")
            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },
}