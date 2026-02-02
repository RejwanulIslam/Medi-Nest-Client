import { cookies } from "next/headers"
const API_URL = process.env.API_URL
import { revalidatePath } from "next/cache";


const AUTH_URL = process.env.AUTH_URL
console.log(AUTH_URL)
export const userService = {
    getSeation: async function () {
        try {
            const cookisStore = await cookies()
            const res = await fetch(`${AUTH_URL}/get-session`, {
                headers: { Cookie: cookisStore.toString() },
                cache: "no-store"

            })
            const seation = await res.json()
            console.log(seation)
            if (seation == null) {
                return { data: null, error: { message: "your seation is null" } }
            }


            return { data: seation, error: null }
        } catch (error) {
            return { data: null, error: { message: "some thing is worng" } }

        }
    },


    getAlluser: async function () {
        const cookieStore = await cookies()

        try {
            const res = await fetch(`${API_URL}/api/user`,
                {
                    headers: {
                        Cookie: cookieStore.toString()
                    },
                }
            )
            const data = await res.json()
            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },
    updateUserStatus: async function (status: string, id: string) {
        const cookieStore = await cookies()

        try {
            const res = await fetch(`${API_URL}/api/user`, {
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

            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },


    manageProfile: async function (Profildata: any, id: string) {
        const cookieStore = await cookies()

        try {
            const res = await fetch(`${API_URL}/api/user/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",

                    Cookie: cookieStore.toString()
                },

                body: JSON.stringify(Profildata),


                cache: "no-store"
            },

            )

            const data = await res.json()

            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },
}