import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import React, { useContext } from "react"
import { ICollection, IProduct } from ".."
import { server } from "../../config"
import { NavigatorContext } from "../../context/NavigatorContext"
import { formatPrice } from "../../lib/format"
import { shimmer, toBase64 } from "../../lib/image"

import styles from "../../styles/Collection.module.css"
import homeStyles from "../../styles/Home.module.css"

interface Props {
    products: IProduct[]
    collectionData: ICollection
}

export const getStaticProps: GetStaticProps = async context => {
    const res = await fetch(`${server}/collections/${context.params?.identifier}/products`)
    let {
        data: { products, collectionData },
    } = await res.json()

    return {
        props: {
            products,
            collectionData,
        },
        revalidate: 60,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`${server}/collections`)
    const { data: collections }: { data: ICollection[] } = await res.json()

    const paths = collections.map(post => ({ params: { identifier: post.identifier.toString() } }))
    return {
        paths,
        fallback: false,
    }
}

const Collection: React.FC<Props> = ({ products, collectionData }) => {
    const { currencyCode, language } = useContext(NavigatorContext)

    return (
        <main className={homeStyles.main}>
            <div style={{ marginBottom: "1.2rem", textAlign: "center" }}>
                <h1 style={{ marginTop: 0, fontSize: "2.3rem", marginBottom: 0 }} className={homeStyles.collectionName}>
                    <span>{collectionData.name}</span>
                </h1>

                <h2 style={{ margin: 0, marginTop: "0.3rem", fontSize: "1.3rem", marginBottom: "0rem" }}>
                    {collectionData.header}
                </h2>
            </div>
            <div className={styles.contentWrapper}>
                <div className={homeStyles.grid}>
                    {products.map(product => (
                        <div key={product.sku} className={`${styles.card}`}>
                            <Link href={`/product/${product.identifier}`} passHref>
                                <a>
                                    <h2 style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {product.name}
                                    </h2>
                                    <Image
                                        placeholder="blur"
                                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
                                        height="300"
                                        width="300"
                                        src={product.imageUrl || product.images[0]}
                                        alt="Product Image"
                                    />
                                    <p className={homeStyles.priceTag}>
                                        {formatPrice(product.price, language?.locale, currencyCode || "USD")}
                                    </p>
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className={styles.collectionInformation}>
                    <h3>Informationen über die Kollektion</h3>
                    <p style={{ marginRight: "1rem" }}>{collectionData.description}</p>
                </div>
            </div>
        </main>
    )
}

export default Collection
