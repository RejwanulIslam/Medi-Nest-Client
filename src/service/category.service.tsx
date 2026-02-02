import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

const API_URL = process.env.API_URL
console.log(API_URL)
export const categoryService = {
    getCategory: async function () {
        try {
            const res = await fetch(`${API_URL}/api/catagoty`)
            const data = await res.json()
            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },
    deleteCategory: async function (id: string) {
        const cookieStore = await cookies()
        try {
            const res = await fetch(`${API_URL}/api/catagoty/${id}`, {
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
            revalidatePath("/admin-dashboard/manage-categorys")

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

    addCategory: async function (categorydata:any) {
            try {
                const cookieStore = await cookies()
    
                const res = await fetch(`${API_URL}/api/catagoty`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: cookieStore.toString()
                    },
                    body: JSON.stringify(categorydata)
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