import Image from "next/image"
import React, { useContext } from "react"
import { CartItem } from "../../context/CartContext"
import { NavigatorContext } from "../../context/NavigatorContext"
import { formatPrice } from "../../lib/format"
import cartStyles from "../../styles/Cart.module.css"
import { FaRegTrashAlt } from "react-icons/fa"
import usePathFill from "../../hooks/usePathFill"

import styles from "../../styles/cart/Item.module.css"
interface Props {
    item: CartItem
    updateQuantity: ((itemSku: string, quantity: number) => void) | undefined
}

const Item: React.FC<Props> = ({ item, updateQuantity }) => {
    const { language, currencyCode } = useContext(NavigatorContext)
    const ref = usePathFill<HTMLButtonElement>()

    return (
        <div className={cartStyles.card} key={item.identifier}>
            <Image
                src={item.imageUrl ? item.imageUrl : item.images[0]}
                width={200}
                height={200}
                alt={item.name}
            />
            <div className={styles.detailWrapper}>
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <h1 className={styles.itemName}>{item.name}</h1>

                    <div className={styles.priceWrapper}>
                        <p>{formatPrice(item.price, language?.locale, currencyCode || "USD")}</p>
                    </div>
                </div>
                <div className={styles.itemDetails}>
                    <p>
                        {item.type.name} - {item.sex}
                    </p>
                    <ul>
                        <li>Größe: L</li>
                        <li>
                            Menge:
                            <select
                                onChange={e => updateQuantity?.(item.sku, parseInt(e.target.value))}
                                name="quantity"
                                id="quantity"
                            >
                                {Array.from({ length: 10 }, (_, n) => n + 1).map(n => (
                                    <option key={n} value={n} defaultChecked={item.quantity == n}>
                                        {n}
                                    </option>
                                ))}
                            </select>
                        </li>
                    </ul>
                </div>
                <button
                    ref={ref}
                    className={styles.removeButton}
                    onClick={() => updateQuantity?.(item.sku, 0)}
                >
                    <FaRegTrashAlt size="18px" color="#e54638" />{" "}
                </button>
            </div>
        </div>
    )
}

export default Item
