import { CategoryCardContainer } from '@/components/CategoruCard'
import { categoryService } from '@/service/category.service'

export default async function page() {
      const {data}=await categoryService.getCategory()

  return (
    <div >
   
    <div className='grid md:grid-cols-2  lg:grid-cols-3 gap-5'>
        
        <CategoryCardContainer initialData={data}></CategoryCardContainer>
        
    </div>
    </div>
  )
}
