import UserTable from "@/components/UserTable"
import { userService } from "@/service/user.service"

export default async function ViwsAllUser() {
  const res = await userService.getAlluser()

  if (res.error) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500 dark:text-slate-400 font-medium">
        Failed to load users. Please try again.
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <UserTable users={res.data} />
    </div>
  )
}