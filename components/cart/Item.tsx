import Image from "next/image"
import React, { useContext } from "react"
import { CartItem } from "../../context/CartContext"
import { NavigatorContext } from "../../context/NavigatorContext"
import { formatPrice } from "../../lib/format"
import styles from "../../styles/Cart.module.css"
import { FaRegTrashAlt } from "react-icons/fa"
import usePathFill from "../../hooks/usePathFill"

interface Props {
    item: CartItem
    updateQuantity: ((itemSku: string, quantity: number) => void) | undefined
}

const Item: React.FC<Props> = ({ item, updateQuantity }) => {
    const { language, currencyCode } = useContext(NavigatorContext)
    const ref = usePathFill<HTMLButtonElement>()

    return (
        <div className={styles.card} key={item.identifier}>
            <Image
                src={item.imageUrl ? item.imageUrl : item.images[0]}
                width={200}
                height={200}
                alt={item.name}
            />
            <div
                style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}
            >
                <div>
                    <h1 style={{ margin: "0", marginBottom: "0.3rem" }}>{item.name}</h1>
                    <p style={{ margin: "0" }}>
                        {item.type.name} - {item.sex}
                    </p>
                </div>
                <div>
                    <ul>
                        <li>Größe: L</li>
                        <li>
                            Menge:
                            <select
                                style={{ marginLeft: ".5rem" }}
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
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}
                    onClick={() => updateQuantity?.(item.sku, 0)}
                >
                    <FaRegTrashAlt size="18px" color="#e54638" />{" "}
                </button>
            </div>
            <div style={{ marginLeft: "auto" }}>
                <p style={{ margin: "0.7rem 0px 0.3rem 0px", fontSize: "1.2rem", fontWeight: 500 }}>
                    {formatPrice(item.price, language?.locale, currencyCode || "USD")}
                </p>
            </div>
        </div>
    )
}

export default Item
