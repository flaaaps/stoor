import { createContext, useState } from "react"
import { IProduct } from "../pages"

export type CartItem = IProduct & { quantity: number }

type ContextProps = {
    items: CartItem[]
    addItem: (item: IProduct) => void
    updateQuantity: (itemSku: IProduct["sku"], quantity: number) => void
    isInCart: (itemSku: IProduct["sku"]) => boolean
}

export const CartContext = createContext<Partial<ContextProps>>({})

export const CartProvider: React.FC = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([])

    const addItem = (item: IProduct) => {
        console.log("Executing add items!")
        const clone = [...items]
        const existingItemIndex = clone.findIndex(i => i.sku === item.sku)
        if (existingItemIndex > -1) {
            clone[existingItemIndex].quantity++
            setItems(clone)
        } else {
            setItems([...clone, { ...item, quantity: 1 }])
        }
    }
    const updateQuantity = (itemSku: IProduct["sku"], quantity: number) => {
        const clone = [...items]
        const itemIndex = clone.findIndex(i => i.sku === itemSku)
        if (itemIndex > -1) {
            clone[itemIndex].quantity = quantity
            console.log(clone[itemIndex].quantity, clone[itemIndex].quantity === 0)
            if (clone[itemIndex].quantity <= 0) {
                clone.splice(itemIndex, 1)
            }
        }
        setItems(clone)
    }

    const isInCart = (itemSku: IProduct["sku"]) => {
        console.log(!!items.find(i => i.sku === itemSku), itemSku)
        return !!items.find(i => i.sku === itemSku)
    }

    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity, isInCart: isInCart }}>
            {children}
        </CartContext.Provider>
    )
}
