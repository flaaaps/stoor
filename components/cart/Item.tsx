import { faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import React, { useContext } from "react"
import { CartItem } from "../../context/CartContext"
import { NavigatorContext } from "../../context/NavigatorContext"
import { formatPrice } from "../../lib/format"
import styles from "../../styles/Cart.module.css"

interface Props {
    item: CartItem
    updateQuantity: ((itemSku: string, quantity: number) => void) | undefined
}

const Item: React.FC<Props> = ({ item, updateQuantity }) => {
    const { language, currencyCode } = useContext(NavigatorContext)

    return (
        <div className={styles.card} key={item.identifier}>
            <Image src={item.imageUrl ? item.imageUrl : item.images[0]} width={200} height={200} alt={item.name} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
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
                    className={styles.removeButton}
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    onClick={() => updateQuantity?.(item.sku, 0)}
                >
                    <FontAwesomeIcon icon={faTrashAlt} width="13" />{" "}
                    <span style={{ fontSize: "0.9rem", marginLeft: ".5rem" }}>Entfernen</span>
                </button>
            </div>
            <div style={{ marginLeft: "auto" }}>
                <h3 style={{ margin: "0.7rem 0px 0.3rem 0px" }}>
                    {formatPrice(item.price, language?.locale, currencyCode || "USD")}
                </h3>
            </div>
        </div>
    )
}

export default Item
