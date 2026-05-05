"use client"

import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { addCard, addReview, getReview } from "@/action/medicine.action"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ShoppingCart, 
  Star, 
  Minus, 
  Plus, 
  PackageCheck, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  MessageSquare
} from "lucide-react"

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
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviews, setReviews] = useState<any[]>([])
  const [showReviews, setShowReviews] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  const increaseQty = () => {
    if (quantity < data.stock) setQuantity(quantity + 1)
  }

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const addCardHandle = async () => {
    if (!userid) {
      return toast.error("Please Login to add items to your cart.")
    }
    
    setIsAddingToCart(true)
    try {
      const card = await addCard({
        customerId: userid,
        productId: data.id,
        quantity,
      })
      if (card) {
        toast.success("Added to cart successfully!")
      }
    } catch (error) {
      toast.error("Failed to add to cart.")
    } finally {
      setIsAddingToCart(false)
    }
  }

  const hasOrdered = userOrders?.some(
    (order: any) => order.productId === data.id
  )

  const handleAddReview = async () => {
    if (!hasOrdered) {
      toast.error("You must purchase this medicine before leaving a review.")
      return
    }

    if (!reviewText.trim() || rating === 0) {
      toast.warning("Please provide both a rating and a review comment.")
      return
    }

    setIsSubmittingReview(true)
    try {
      await addReview({
        productId: data.id,
        rating: rating,
        comment: reviewText,
      })
      
      toast.success("Review submitted successfully!")
      setReviewText("")
      setRating(0)
      fetchReviews()
    } catch (error) {
      toast.error("Failed to submit review.")
    } finally {
      setIsSubmittingReview(false)
    }
  }

  const fetchReviews = async () => {
    const res = await getReview(data.id)
    setReviews(res || [])
  }

  useEffect(() => {
    if (showReviews) fetchReviews()
  }, [showReviews])

  // Calculate average rating
  const avgRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "No ratings yet"

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        
        {/* Main Product Section */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-200/60 dark:border-slate-800 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left: Product Image */}
            <div className="relative p-8 md:p-12 lg:p-16 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800/50">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 bg-white dark:bg-slate-800 flex items-center justify-center p-6 border border-slate-200 dark:border-slate-700"
              >
                <Badge className={`absolute top-4 left-4 z-10 font-semibold px-3 py-1 shadow-sm ${data?.stock > 0 ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-rose-500 hover:bg-rose-600 text-white"}`}>
                  {data?.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
                
                <img
                  src={data?.image ?? "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80"}
                  alt={data?.medicineName}
                  className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                />
              </motion.div>
            </div>

            {/* Right: Product Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700">
                    {data?.categorie?.categorieName || "General"}
                  </Badge>
                  <div className="flex items-center text-sm font-medium text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-current mr-1" />
                    {avgRating}
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                  {data?.medicineName}
                </h1>
                
                <p className="text-lg text-slate-500 dark:text-slate-400 mb-6">
                  By <span className="font-semibold text-slate-700 dark:text-slate-300">{data?.manufacturer}</span>
                </p>

                <div className="flex items-end gap-3 mb-8">
                  <span className="text-4xl md:text-5xl font-black text-emerald-600 dark:text-emerald-400">
                    ৳ {data?.price}
                  </span>
                </div>

                <div className="space-y-6 mb-8">
                  {/* Quantity Selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Quantity</label>
                    <div className="flex items-center w-max bg-slate-100 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={decreaseQty}
                        disabled={quantity === 1}
                        className="h-10 w-10 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-bold text-lg text-slate-900 dark:text-white">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={increaseQty}
                        disabled={quantity === data?.stock}
                        className="h-10 w-10 rounded-lg hover:bg-white dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {data?.stock > 0 && data?.stock <= 10 && (
                      <span className="text-xs text-rose-500 font-medium">Only {data.stock} items left in stock!</span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    size="lg"
                    onClick={addCardHandle}
                    disabled={data?.stock === 0 || isAddingToCart}
                    className="w-full h-14 text-lg rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
                  >
                    {isAddingToCart ? (
                      <span className="flex items-center gap-2">Processing...</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" /> Add to Cart
                      </span>
                    )}
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    100% Genuine Product
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                      <PackageCheck className="w-5 h-5" />
                    </div>
                    Fast & Safe Delivery
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </div>

        {/* Details & Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Description */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200/60 dark:border-slate-800"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                Medicine Details
              </h3>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {data?.detels || "No detailed description available for this medicine."}
                </p>
              </div>
            </motion.div>

            {/* Reviews Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-200/60 dark:border-slate-800"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Customer Reviews
                </h3>
                <Button
                  variant="outline"
                  onClick={() => setShowReviews(!showReviews)}
                  className="rounded-full border-slate-200 dark:border-slate-700 font-semibold"
                >
                  {showReviews ? (
                    <span className="flex items-center gap-2">Hide Reviews <ChevronUp className="w-4 h-4" /></span>
                  ) : (
                    <span className="flex items-center gap-2">Show Reviews <ChevronDown className="w-4 h-4" /></span>
                  )}
                </Button>
              </div>

              <AnimatePresence>
                {showReviews && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 mb-8">
                      {reviews.length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                          <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-500 dark:text-slate-400 font-medium">No reviews yet. Be the first to review!</p>
                        </div>
                      ) : (
                        reviews.map((r) => (
                          <div
                            key={r.id}
                            className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                  {(r.user?.name || "A").charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 dark:text-white">
                                    {r.user?.name ?? "Anonymous Customer"}
                                  </p>
                                  <div className="flex gap-0.5 mt-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`w-3.5 h-3.5 ${i < r.rating ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`} 
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs font-medium text-slate-400 bg-white dark:bg-slate-900 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">Verified Buyer</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                              "{r.comment}"
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right Column: Write Review */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-200/60 dark:border-slate-800 sticky top-24"
            >
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Write a Review</h4>

              {!hasOrdered ? (
                <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-rose-600 dark:text-rose-400 text-center">
                    You must order this medicine first to leave a verified review.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Rate this product</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star 
                            className={`w-8 h-8 transition-colors ${
                              star <= (hoveredRating || rating) 
                                ? "text-amber-400 fill-amber-400" 
                                : "text-slate-200 dark:text-slate-700"
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Your Experience</label>
                    <Textarea
                      placeholder="Tell others what you think about this medicine..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="resize-none h-32 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus-visible:ring-emerald-500"
                    />
                  </div>

                  <Button 
                    onClick={handleAddReview} 
                    disabled={isSubmittingReview || rating === 0 || !reviewText.trim()}
                    className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold"
                  >
                    {isSubmittingReview ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  )
}