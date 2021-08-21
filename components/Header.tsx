import React from "react"
import Link from "next/link"
import { FaShoppingCart } from "react-icons/fa"
import usePathFill from "../hooks/usePathFill"

interface Props {}

const Header: React.FC<Props> = () => {
    const ref = usePathFill<HTMLAnchorElement>()

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "15px",
                paddingLeft: "30px",
                paddingRight: "30px"
            }}
        >
            <div style={{ width: "40px", height: "40px" }}>
                <Link href="/cart" passHref>
                    <a ref={ref} style={{ color: "var(--color-primary)" }}>
                        <FaShoppingCart size="32" />
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Header
