import { CreateMedicineInput } from "@/types";
import { cookies } from "next/headers";
const API_URL = process.env.API_URL
interface getBlogParams {
    isFutured?: boolean;
    serch?: string;
    page?: string;
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
    getMedicine: async function (params?: getBlogParams, options?: serviceOptions) {
        try {
            const url = new URL(`${API_URL}/api/medicines`)
            if (params) {
                Object.entries(params).forEach(([keyof, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(keyof, value)
                    }
                })
            }
            const config: RequestInit = {}
            if (options?.cache) {
                config.cache = options.cache
            }
            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate }
            }
            config.next = { ...config, tags: ['blog-post'] }

            // console.log(url.toString())
            // const res = await fetch(url.toString(),{
            //     next:{
            //         tags:["blog-post"]
            //     }
            // })
            const res = await fetch(url.toString(), config)
            const data = await res.json()
            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },
    getMdicineById: async function (id: string) {
        try {
            const res = await fetch(`${API_URL}/api/medicines/${id}`,{
                cache:"no-store"
            })
            const data = await res.json()
            return { data: data, error: null }
        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },

    createMedicine: async function (blogData:CreateMedicineInput) {
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