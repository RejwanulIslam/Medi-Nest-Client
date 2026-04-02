"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Input } from "./ui/input"
import { addCard, addReview, getReview } from "@/action/medicine.action"
import { toast, Toaster } from "sonner"

export default function DetelsPage({
  data,
  userid,
  userOrders,
}: {
  data: any
  userid: string
  userOrders: any[]
}) {
  const [quantity, setQuantity] = useState(1)
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState("")
  const [reviews, setReviews] = useState<any[]>([])
  const [showReviews, setShowReviews] = useState(false)

  const increaseQty = () => {
    if (quantity < data.stock) setQuantity(quantity + 1)
  }

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const addCardHandle = async () => {
    if(!userid){
      return toast.error("Plase Login")
    }
  const card=  await addCard({

      customerId: userid,
      productId: data.id,
      quantity,
    })
    if(card){
return toast.success("catd added sucessfully")
    }
  }

  const hasOrdered = userOrders?.some(
    (order: any) => order.productId === data.id
  )

  const handleAddReview = async () => {
    if (!hasOrdered) {
      toast.warning("You need to order this product first.")
      return
    }

    if (!reviewText.trim() || !rating) {
      toast.warning("Leave reviews and ratings.")
      return
    }

    await addReview({
      productId: data.id,
      rating: Number(rating),
      comment: reviewText,
    })

    setReviewText("")
    setRating("")
    fetchReviews()
  }

  const fetchReviews = async () => {
    const res = await getReview(data.id)
    setReviews(res || [])
  }

  useEffect(() => {
    if (showReviews) fetchReviews()
  }, [showReviews])

  return (
    <div className="container mx-auto max-w-5xl py-10">
      <Card>
        <CardContent className="grid grid-cols-1 gap-8 p-6 md:grid-cols-2">
          <div className="relative">
            <img
              src={
                data?.image ??
                "https://i.ibb.co/yc1DkDrb/colorful-pills-syringe.jpg"
              }
              alt={data?.medicineName}
              className="w-full rounded-lg object-cover"
            />

            <Badge
              className={`absolute left-3 top-3 ${data?.stock > 0 ? "bg-green-600" : "bg-red-600"
                }`}
            >
              {data?.stock > 0 ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          <div className="flex flex-col gap-4">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl">
                {data?.medicineName}
              </CardTitle>
            </CardHeader>

            <p className="text-sm text-muted-foreground">
              Manufacturer:{" "}
              <span className="font-medium">{data?.manufacturer}</span>
            </p>

            <Badge variant="secondary">
              Category: {data?.categorie?.categorieName}
            </Badge>

            <p className="text-3xl font-bold text-primary">
              ৳ {data?.price}
            </p>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Quantity</span>
              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decreaseQty}
                  disabled={quantity === 1}
                >
                  −
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={increaseQty}
                  disabled={quantity === data?.stock}
                >
                  +
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              onClick={addCardHandle}
              disabled={data.stock === 0}
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>

        <Separator />

        {/* Description + Review */}
        <CardContent className="space-y-6 p-6">
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              Medicine Details
            </h3>
            <p className="text-sm text-muted-foreground">
              {data?.detels}
            </p>
          </div>

          {/* Add Review */}
          <div className="rounded-lg border p-4 space-y-3">
            <h4 className="font-semibold">Write a Review</h4>

            {!hasOrdered && (
              <p className="text-sm text-red-500">
                To leave a review, you must order first.
              </p>
            )}

            <Input
              placeholder="Your review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              disabled={!hasOrdered}
            />

            <Input
              type="number"
              min={1}
              max={5}
              placeholder="Rating (1-5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-32"
              disabled={!hasOrdered}
            />

            <Button onClick={handleAddReview} disabled={!hasOrdered}>
              Submit Review
            </Button>
          </div>

          <div>
            <Button
              variant="outline"
              onClick={() => setShowReviews(!showReviews)}
            >
              {showReviews ? "Hide Reviews" : "Show Reviews"}
            </Button>

            {showReviews && (
              <div className="mt-4 space-y-3">
                {reviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No reviews yet.
                  </p>
                ) : (
                  reviews.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-md border p-3"
                    >
                      <div className="flex justify-between">
                        <p className="font-semibold">
                          {r.user?.name ?? "Anonymous"}
                        </p>
                        <span className="text-sm">
                          ⭐ {r.rating}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {r.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}