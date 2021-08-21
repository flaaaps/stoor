import { useCallback } from "react"

export default function usePathFill<T extends HTMLElement>() {
    return useCallback((node: T) => {
        if (!node) return

        node.querySelectorAll("path").forEach(path => {
            if (!path.hasAttribute("fill")) {
                path.setAttribute("fill", "currentColor")
            }
        })
    }, [])
}
