import { getParamByISO } from "iso-country-currency"
import { createContext, useEffect, useState } from "react"

type ContextProps = {
    language: {
        iso: string
        locale: string
    }
    currencyCode: string
}

export const NavigatorContext = createContext<Partial<ContextProps>>({})

export const NavigatorProvider: React.FC = ({ children }) => {
    const [language, setLanguage] = useState<{ iso: string; locale: string }>()
    const [currency, setCurrency] = useState<string>()

    useEffect(() => {
        if (window) {
            let iso = window.navigator.language === "en" ? "us" : window.navigator.language
            if (iso.indexOf("-") > -1) {
                iso = iso.split("-")[1]
            }
            setLanguage({ iso, locale: window.navigator.language })
        }
    }, [])

    useEffect(() => {
        if (language) {
            setCurrency(getParamByISO(language.iso, "currency"))
        }
    }, [currency, language])
    return (
        <NavigatorContext.Provider value={{ language, currencyCode: currency }}>{children}</NavigatorContext.Provider>
    )
}
