

import { CreateMedicineInput } from "@/types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
const API_URL = process.env.API_URL
export type getBlogParams = {
  serch?: string
  category?: string
  minPrice?: string
  maxPrice?: string
  manufacturer?: string
}
interface serviceOptions {
    cache?: RequestCache;
    revalidate?: number;

}
export interface blogData {
    title: string;
    content?: string;
    tag?: string[]
}
export const medicineService = {


    getMedicine: async function (params?: getBlogParams) {
        try {
            const url = new URL(`${API_URL}/api/medicines`)
            if (params) {
                Object.entries(params).forEach(([keyof, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(keyof, value)
                    }
                })
            }

            const res = await fetch(url.toString())
            const data = await res.json()
            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },
    getMdicineById: async function (id: string) {
        try {
            const res = await fetch(`${API_URL}/api/medicines/${id}`, {
                cache: "no-store"
            })
            const data = await res.json()
            return { data: data, error: null }
        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },


    updateMedicine: async (data: any, id: string) => {
        const cookieStore = await cookies()
        try {
            const res = await fetch(`${API_URL}/api/medicines/${id}`, {
                method: "PATCH",
                headers: {
                    Cookie: cookieStore.toString(),
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(data),
                credentials: 'include',
                cache: "no-store"
            });

            const result = await res.json()


            if (result.error) {
                return {
                    data: null,
                    error: { message: result.error || "Error:post is not created" }

                }
            };
            return { data: result, error: null }
        } catch (error: any) {

            return {
                data: null,
                error: {
                    message: error.message || "Failed to update medicine",
                },
            };
        }
    },


    deleteMedicine: async (id: string) => {


        const cookieStore = await cookies()
        try {
            const res = await fetch(`${API_URL}/api/medicines/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                    "Content-Type": "application/json",

                },
                credentials: 'include',
                cache: "no-store",
            });

            const result = await res.json()


            if (result.error) {
                return {
                    data: null,
                    error: { message: result.error || "Error:post is not created" }

                }
            };
            revalidatePath("/seller-dashboard/manage-medicine")

            return { data: result, error: null }
        } catch (error: any) {

            return {
                data: null,
                error: {
                    message: error.message || "Failed to update medicine",
                },
            };
        }
    },

    createMedicine: async function (blogData: CreateMedicineInput) {
        try {
            const cookieStore = await cookies()

            const res = await fetch(`${API_URL}/api/seller/medicines`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString()
                },
                body: JSON.stringify(blogData)
            })
            const data = await res.json()
            if (data.error) {
                return {
                    data: null,
                    error: { message: data.error || "Error:post is not created" }
                }
            }

            return { data: data, error: null }
        } catch (error: any) {
            return {
                data: null,
                error: { message: error.message || "Error:Something is worng" }
            }
        }
    }

}