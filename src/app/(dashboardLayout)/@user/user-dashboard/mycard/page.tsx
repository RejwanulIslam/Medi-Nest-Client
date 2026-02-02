import Addcard from '@/components/Addcards'
import { cardService } from '@/service/card.service'
import { userService } from '@/service/user.service'

export default async function MyCardPage() {
  const { data } = await cardService.getcard()
  const { data: seation } = await userService.getSeation()
  const filterByUserId = data.filter((item: any) => item.customerId == seation.user.id)
  return (
    <div >
      {
        filterByUserId.length !== 0 && <Addcard product={filterByUserId}></Addcard>
      }
      {
        filterByUserId.length == 0 && <h1 className='text-center font-bold'>Do Not Card Exist</h1>
      }
      
    </div>
  )
}
