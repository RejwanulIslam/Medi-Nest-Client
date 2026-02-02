"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { addCategory } from "@/action/medicine.action"
import { toast } from "sonner"

export interface CategoryCardProps {
  id: string
  categorieName: string
}

interface CategoryCardContainerProps {
  initialData: CategoryCardProps[]
}

export function CategoryCardContainer({ initialData }: CategoryCardContainerProps) {
  const [newCategory, setNewCategory] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return
    setLoading(true)
    try {
      const res = await addCategory({ categorieName: newCategory })
     console.log(res)
      if (res.categorieName) {
        toast.success("Category added successfully!")

      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to add category")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="">
      <div>
        <input
          type="text"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <Button
          onClick={handleAddCategory}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </div>

      <div className="">
        {initialData.map((item) => (
          <Card
            key={item.id}
          >
            <CardHeader className="">
              <CardTitle >
                {item?.categorieName}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}