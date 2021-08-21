import React from "react"
import { CartItem } from "../../context/CartContext"
import styles from "../../styles/Cart.module.css"
import Item from "./Item"

interface Props {
    items: CartItem[] | undefined
    updateQuantity: ((itemSku: string, quantity: number) => void) | undefined
}

const ItemGrid: React.FC<Props> = ({ items, updateQuantity }) => {
    return (
        <div className={styles.grid}>
            {items?.map(i => (
                <Item updateQuantity={updateQuantity} key={i.sku} item={i} />
            ))}
        </div>
    )
}

export default ItemGrid
