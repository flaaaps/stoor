export function formatPrice(price: number, locale: string | undefined, currencyCode: string) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
    }).format(price / 100)
}
