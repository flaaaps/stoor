import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import ItemGrid from "../components/cart/ItemGrid"
import { CartContext } from "../context/CartContext"

import undrawEmpty from "../public/assets/cart/undraw_empty_cart_co35.svg"
import styles from "../styles/Cart.module.css"

export default function Cart() {
    const { items, updateQuantity } = useContext(CartContext)

    return (
        <>
            <Head>
                <title>Cart | Stoor</title>
            </Head>
            <h1 className={styles.title}>Einkaufswagen</h1>
            {items && items.length > 0 ? (
                <div>
                    <ItemGrid updateQuantity={updateQuantity} items={items} />
                    <hr className={styles.divider} />
                </div>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <p>
                        Dein Einkaufswagen ist leer. Besuche die{" "}
                        <Link href="/" passHref>
                            <a className={styles.link}>Startseite</a>
                        </Link>{" "}
                        um dir unsere Produkte anzusehen!
                    </p>
                    <div style={{ marginTop: "3rem" }}>
                        <Image height="350" src={undrawEmpty} alt="Empty cart" />
                    </div>
                </div>
            )}
        </>
    )
}
