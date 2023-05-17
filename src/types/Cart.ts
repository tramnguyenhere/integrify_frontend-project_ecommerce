import { Product } from "./Product"

export interface CartItem extends Product {
    quantity: number,
    amount: number
    cartId: string
}

export interface Cart {
    items: CartItem[],
    totalAmount: number,
    totalQuantity: number
}
