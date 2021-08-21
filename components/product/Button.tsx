import Link from "next/link"
import React, { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { IProduct } from "../../pages"
import styles from "../../styles/Product.module.css"

interface Props {
    product: IProduct
}

const Button: React.FC<Props> = ({ product }) => {
    const { addItem, isInCart } = useContext(CartContext)
    const [alreadyInCart, setAlreadyInCart] = useState(isInCart?.(product.sku))

    const handleClick = () => {
        addItem?.(product)
        setAlreadyInCart(true)
    }

    if (alreadyInCart) {
        return (
            <Link href="/cart" passHref>
                <button className={styles.productButton}>Zum Warenkorb</button>
            </Link>
        )
    } else {
        return (
            <button className={styles.productButton} onClick={() => !alreadyInCart && handleClick()}>
                <span>+ In den Warenkorb legen</span>
            </button>
        )
    }
}

export default Button
