import UserTable from "@/components/UserTable"
import { userService } from "@/service/user.service"

export default async function ViwsAllUser() {
  const res = await userService.getAlluser()

  if (res.error) {
    return <div>Failed to load users</div>
  }

  return (
    <div>
      <UserTable users={res.data} />
    </div>
  )
}