
const API_URL = process.env.API_URL
console.log(API_URL)
export const categoryService = {
    getCategory: async function () {
        try {
          const  res = await fetch(`${API_URL}/getcatagoty`)
            const data = await res.json()
            return { data: data, error: null }

        } catch (error: any) {
            return { date: null, error: { message: error.message } }
        }
    },


}