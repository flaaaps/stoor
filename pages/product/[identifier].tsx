import { GetStaticPaths, GetStaticProps } from "next"
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js"

import { IProduct } from ".."
import { server } from "../../config"
import styles from "../../styles/Product.module.css"
import Head from "next/head"

import ProductButton from "../../components/product/Button"
import ImageSlider from "../../components/product/ImageSlider"
import ProductInformation from "../../components/product/Information"

type Props = {
    product: IProduct
}

export const getStaticProps: GetStaticProps = async context => {
    const res = await fetch(`${server}/products/${context.params?.identifier}`)
    const { data } = await res.json()
    return {
        props: {
            product: data,
        },
        revalidate: 60,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`${server}/products`)
    const { data: posts }: { data: IProduct[] } = await res.json()

    const paths = posts.map(post => ({ params: { identifier: post.identifier.toString() } }))
    return {
        paths,
        fallback: false,
    }
}

const Post: React.FC<Props> = ({ product }) => {
    return (
        <div>
            <Head>
                <title>
                    {product.type.name} &quot;{product.name}&quot; {product.sex}
                </title>
                <meta property="og:title" content={`${product.type.name} "${product.name}" ${product.sex}`} />
                <meta property="og:image" content={product.imageUrl} />
                <meta property="og:image:width" content="800" />
                <meta property="og:image:height" content="800" />
            </Head>
            <div className={styles.productCard}>
                <div className={styles.productDescription}>
                    <ProductInformation
                        name={`${product.type.name} "${product.name}" ${product.sex}`}
                        price={product.price}
                    />
                    <div className={styles.buttonWrapper}>
                        <PayPalButtons
                            fundingSource={FUNDING.PAYPAL}
                            style={{ layout: "horizontal" }}
                            createOrder={(_, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            description: `${product.type.name} "${product.name}" ${product.sex}`,
                                            amount: {
                                                currency_code: "EUR",
                                                value: (product.price / 100).toString(),
                                            },
                                        },
                                    ],
                                })
                            }}
                        />
                        <ProductButton product={product} />
                    </div>
                </div>
                <ImageSlider images={product.imageUrl ? [product.imageUrl] : product.images} />
            </div>
        </div>
    )
}

export default Post
