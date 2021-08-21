import "../styles/globals.css"
import type { AppProps } from "next/app"
import { NavigatorProvider } from "../context/NavigatorContext"
import Header from "../components/Header"
import { CartProvider } from "../context/CartContext"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header />

            <PayPalScriptProvider
                options={{
                    "client-id": "AXDOaIs2ZNMvzyUcsFzE8PSu6ZYWX7lsovJAgtDEyeN3cA20g_rL08d7OpZf_2cRXvm-KT9KoRg55i6W",
                    currency: "EUR",
                }}
            >
                <NavigatorProvider>
                    <CartProvider>
                        <Component {...pageProps} />
                    </CartProvider>
                </NavigatorProvider>
            </PayPalScriptProvider>
        </>
    )
}
export default MyApp
