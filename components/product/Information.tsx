import React, { useContext } from "react"
import { NavigatorContext } from "../../context/NavigatorContext"
import { formatPrice } from "../../lib/format"
import styles from "../../styles/Product.module.css"

interface Props {
    name: string
    price: number
}

const Information: React.FC<Props> = ({ name, price }) => {
    const { language, currencyCode } = useContext(NavigatorContext)

    return (
        <div className={styles.productInformation}>
            <h1>{name}</h1>
            <p className={styles.productPrice}>{formatPrice(price, language?.locale, currencyCode || "USD")}</p>
            <p>inkl. MwSt. zzgl. Versandkosten</p>
        </div>
    )
}

export default Information
