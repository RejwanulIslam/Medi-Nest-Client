import { cookies } from "next/headers"



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
    }
}