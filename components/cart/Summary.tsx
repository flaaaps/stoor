import React, { useContext } from "react"
import { useCallback } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { CartItem } from "../../context/CartContext"
import { NavigatorContext } from "../../context/NavigatorContext"
import usePathFill from "../../hooks/usePathFill"
import { formatPrice } from "../../lib/format"
import styles from "../../styles/cart/Summary.module.css"

interface Props {
    items: CartItem[]
}

const Summary: React.FC<Props> = ({ items }) => {
    const ref = usePathFill<HTMLButtonElement>()
    const { language, currencyCode } = useContext(NavigatorContext)

    const [subtotal, setSubtotal] = useState<number | null>(null)
    const [total, setTotal] = useState<number | null>(null)

    const shipping = 200 // get shipping from api or sth
    const calculatePrice = useCallback(() => {
        let _subtotal = 0
        for (let i of items) {
            _subtotal += i.price * i.quantity
        }
        setSubtotal(_subtotal)

        setTotal(_subtotal + shipping)
    }, [items])

    useEffect(() => {
        calculatePrice()
    }, [calculatePrice])

    function _formatPrice(price: number) {
        return formatPrice(price, language?.locale, currencyCode ?? "USD")
    }

    return (
        <div className={styles.outer}>
            <div className={`${styles.card} ${styles.summaryCard}`}>
                <h2 style={{ margin: 0 }}>Bestellübersicht</h2>
                <div style={{ marginTop: "0.75rem" }}>
                    <div>
                        <span>Zwischensumme</span>
                        {subtotal && (
                            <span style={{ float: "right" }}>{_formatPrice(subtotal)}</span>
                        )}
                    </div>
                    <div>
                        <span>Versand</span>
                        <span style={{ float: "right" }}>{_formatPrice(shipping)}</span>
                    </div>
                    <hr className={styles.divider} />
                    <div style={{ color: "var(--color-secondary)" }}>
                        <span>Gesamt (inkl. MwSt)</span>
                        {total && (
                            <span style={{ float: "right", color: "var(--color-text)" }}>
                                {_formatPrice(total)}
                            </span>
                        )}
                    </div>
                </div>
                {/* <DiscountCodeInput setDiscount={setDiscount} /> // TODO: Move to checkout/billing section */}
                <button ref={ref} className={styles.continueButton}>
                    <span>Weiter zur Kasse</span>
                </button>
            </div>
        </div>
    )
}

export default Summary
