"use client"

import * as React from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ProductImageGalleryProps {
    images: string[]
    productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
    const [selectedImage, setSelectedImage] = React.useState(0)
    const [isOpen, setIsOpen] = React.useState(false)

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
                <Image
                    src="/placeholder.jpg"
                    alt={productName}
                    fill
                    className="object-cover"
                />
            </div>
        )
    }

    const handlePrevious = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    }

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation()
        setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    }

    return (
        <div className="space-y-4">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div className="aspect-square relative rounded-lg overflow-hidden cursor-zoom-in group border">
                        <Image
                            src={images[selectedImage]}
                            alt={productName}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full h-full md:h-auto md:max-h-[85vh] p-0 bg-black/95 border-none">
                    <div className="relative w-full h-[80vh] md:h-[80vh] flex items-center justify-center">
                        <Image
                            src={images[selectedImage]}
                            alt={productName}
                            fill
                            className="object-contain"
                            priority
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevious}
                                    className="absolute left-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                                >
                                    <ChevronLeft className="h-8 w-8" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                                >
                                    <ChevronRight className="h-8 w-8" />
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white"
                        >
                            <X className="h-6 w-6" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                            {selectedImage + 1} / {images.length}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={cn(
                                "aspect-square relative rounded-md overflow-hidden border-2 transition-all",
                                selectedImage === index
                                    ? "border-primary ring-2 ring-primary/20"
                                    : "border-transparent hover:border-muted-foreground/25"
                            )}
                        >
                            <Image
                                src={image}
                                alt={`${productName} thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
