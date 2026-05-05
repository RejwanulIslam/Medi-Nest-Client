import { CategoryCardContainer } from '@/components/CategoruCard'
import { categoryService } from '@/service/category.service'

export default async function page() {
  const { data } = await categoryService.getCategory()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <CategoryCardContainer initialData={data} />
    </div>
  )
}
