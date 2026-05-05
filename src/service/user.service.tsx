import { cookies } from "next/headers"
const API_URL = process.env.API_URL


const AUTH_URL = process.env.AUTH_URL
export const userService = {
    getSeation: async function () {
        const cookieStore = await cookies();


        try {
            const res = await fetch(`${AUTH_URL}/get-session`, {

                headers: { cookie: cookieStore.toString() },
                cache: "no-store",
            })

            // check response
            if (!res.ok) {
                const errorText = await res.text();
                console.error("Auth Server Error Text:", errorText);
                return { data: null, error: { message: "Session unauthorized" } };
            }

            // check valid json
            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                return { data: null, error: { message: "Invalid JSON response from server" } };
            }

            const seation = await res.json()
            console.log("seation", seation)
            console.log("Session Response:", seation)
            if (!seation || !seation.user) {
                return { data: null, error: { message: "No session found" } }
            }

            return { data: seation, error: null }
        } catch (error: any) {
            console.error("Session fetch error:", error)
            return { data: null, error: { message: error.message || "Failed to fetch session" } }
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
                    Cookie: cookieStore.getAll()
                        .map((c) => `${c.name}=${c.value}`)
                        .join("; "),
                },
                body: JSON.stringify(Profildata),
                cache: "no-store",
            })

            const data = await res.json()

            if (!res.ok) {
                return { data: null, error: { message: data?.message ?? "Update failed" } }
            }

            return { data: data, error: null }

        } catch (error: any) {
            return { data: null, error: { message: error.message } }
        }
    },
}