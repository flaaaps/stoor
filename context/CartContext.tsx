import { useEffect } from "react"
import { createContext, useCallback, useState } from "react"
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

    useEffect(() => {
        setItems(JSON.parse(readFromStorage("cart") ?? "[]"))
    }, [])

    useEffect(() => {
        writeToStorage("cart", JSON.stringify(items))
    }, [items])

    const writeToStorage = (key: string, value: string) => {
        localStorage.setItem(key, value)
    }

    const readFromStorage = (key: string) => {
        return localStorage.getItem(key)
    }

    const addItem = useCallback(
        (item: IProduct) => {
            const clone = [...items]
            const existingItemIndex = clone.findIndex(i => i.sku === item.sku)
            if (existingItemIndex > -1) {
                clone[existingItemIndex].quantity++
                setItems(clone)
            } else {
                setItems([...clone, { ...item, quantity: 1 }])
            }
        },
        [items, setItems]
    )

    const updateQuantity = useCallback(
        (itemSku: IProduct["sku"], quantity: number) => {
            const clone = [...items]
            const itemIndex = clone.findIndex(i => i.sku === itemSku)
            if (itemIndex > -1) {
                clone[itemIndex].quantity = quantity
                if (clone[itemIndex].quantity <= 0) {
                    clone.splice(itemIndex, 1)
                }
            }
            setItems(clone)
        },
        [items, setItems]
    )

    const isInCart = useCallback(
        (itemSku: IProduct["sku"]) => {
            return !!items.find(i => i.sku === itemSku)
        },
        [items]
    )

    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity, isInCart: isInCart }}>
            {children}
        </CartContext.Provider>
    )
}
