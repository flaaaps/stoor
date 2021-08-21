import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

interface Props {}

const Header: React.FC<Props> = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "15px",
                paddingLeft: "30px",
                paddingRight: "30px",
            }}
        >
            <div style={{ width: "40px", height: "40px" }}>
                <Link href="/cart" passHref>
                    <a>
                        <FontAwesomeIcon icon={faShoppingBasket} height="40" width="40" />
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default Header
