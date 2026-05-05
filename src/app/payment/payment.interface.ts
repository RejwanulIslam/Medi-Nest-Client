export interface OrderItem {
  productId: string
  medicineName: string
  price: number
  quantity: number
  image: string
  cartItemId?: string   // used to clear the cart after stripe payment
}