import UserProfileCard from '@/components/UserProfileCard'
import { userService } from '@/service/user.service'
import React from 'react'

export default async function page() {
    const {data}=await userService.getSeation()
    console.log(data.user)
  return (
    <div>
        <UserProfileCard user={data.user}></UserProfileCard>
    </div>
  )
}
