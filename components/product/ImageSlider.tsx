import { useEmblaCarousel } from "embla-carousel/react"
import Image from "next/image"
import React, { useCallback, useEffect, useState } from "react"
import { shimmer, toBase64 } from "../../lib/image"

interface Props {
    images: string[]
}

const ImageSlider: React.FC<Props> = ({ images }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ speed: 12 })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

    const [hideButtons, setHideButtons] = useState(true)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
    }, [emblaApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on("select", onSelect)
    }, [emblaApi, onSelect])

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
        const target = event.target as HTMLImageElement
        if (target.complete && target.style.visibility !== "hidden") {
            console.log("Image loaded!")
            setHideButtons(false)
        }
    }
    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {images.map(pr => (
                        <div className="embla__slide" key={pr}>
                            <Image
                                onLoad={handleImageLoad}
                                placeholder="blur"
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(300, 300))}`}
                                height="500"
                                width="500"
                                src={pr}
                                alt="Product Image"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div
                style={hideButtons || (!prevBtnEnabled && !nextBtnEnabled) ? { display: "none" } : { display: "block" }}
            >
                <button className="embla__button embla__button--prev" onClick={scrollPrev} disabled={!prevBtnEnabled}>
                    <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
                        <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
                    </svg>
                </button>
                <button className="embla__button embla__button--next" onClick={scrollNext} disabled={!nextBtnEnabled}>
                    <svg className="embla__button__svg" viewBox="0 0 238.003 238.003">
                        <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default ImageSlider
