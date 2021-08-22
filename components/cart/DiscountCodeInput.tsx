import React, { useRef } from "react"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import usePathFill from "../../hooks/usePathFill"
import styles from "../../styles/Cart.module.css"

interface Props {
    setDiscount: () => void
}

const DiscountCodeInput: React.FC<Props> = () => {
    const labelRef = useRef<HTMLParagraphElement | null>(null)
    const ref = usePathFill<HTMLButtonElement>()

    const [codeValue, setCodeValue] = useState<string | null>(null)
    const [codeError, setCodeError] = useState<{
        errorCode: number
        displayMessage: string
    } | null>(null)

    const inputFocused = () => {
        console.log("Input focused")
        if (labelRef.current) {
            console.log("Setting style!")

            labelRef.current.classList.remove(styles.codeInputBlurred)
            labelRef.current.classList.add(styles.codeInputFocused)
        }
    }

    const inputBlurred = () => {
        console.log("Input blurred")
        if (labelRef.current) {
            console.log("Setting style!")
            if (codeValue === null) {
                labelRef.current.classList.remove(styles.codeInputFocused)
                labelRef.current.classList.add(styles.codeInputBlurred)
            }
        }
    }

    const validateCode = () => {
        console.log("Validating code...")
        // do validation stuff here

        setCodeError({
            errorCode: 32,
            displayMessage: "Der eingegebene Code konnte nicht gefunden werden."
        })
    }

    return (
        <div className={styles.discountCode}>
            <div className={styles.discountCodeInputWrapper}>
                <input
                    type="text"
                    onChange={e =>
                        !!e.target.value ? setCodeValue(e.target.value) : setCodeValue(null)
                    }
                    onKeyDown={e => e.key === "Enter" && validateCode()}
                    onBlur={() => inputBlurred()}
                    onFocus={() => inputFocused()}
                />
                <p ref={labelRef} className={styles.codeInputBlurred}>
                    Code eingeben
                </p>
                <button
                    onClick={() => setCodeError(null)}
                    style={{ color: "var(--color-secondary)" }}
                    ref={ref}
                >
                    <FaPlus size="0.85rem" />
                </button>
            </div>
            {codeError !== null && <p className={styles.codeError}>{codeError.displayMessage}</p>}
        </div>
    )
}

export default DiscountCodeInput
