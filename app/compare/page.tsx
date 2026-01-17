"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useCompare } from "@/lib/compare-context"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowLeft, Trash2 } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ProductDetail {
    id: string
    name: string
    slug: string
    price: number
    originalPrice?: number
    brand: string
    horsepower: string
    inverter: boolean
    images: string[]
    specifications: Record<string, string>
    benefits: string[]
}

export default function ComparePage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { items, removeItem } = useCompare()
    const [products, setProducts] = useState<ProductDetail[]>([])
    const [loading, setLoading] = useState(true)

    // Sync context items to URL if not present
    useEffect(() => {
        const idsParam = searchParams.get("ids")
        if (!idsParam && items.length > 0) {
            const ids = items.map((i) => i.id).join(",")
            router.replace(`/compare?ids=${ids}`)
        } else if (items.length === 0 && !idsParam) {
            setLoading(false)
        }
    }, [items, searchParams, router])

    // Fetch product specifications
    useEffect(() => {
        const ids = searchParams.get("ids")
        if (!ids) {
            if (items.length === 0) setProducts([])
            return
        }

        const fetchProducts = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/products?ids=${ids}`)
                const data = await res.json()
                setProducts(data)
            } catch (error) {
                console.error("Error fetching compare products:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [searchParams])

    const handleRemove = (id: string) => {
        removeItem(id)
        // Update URL
        const newItems = items.filter((i) => i.id !== id)
        if (newItems.length > 0) {
            const ids = newItems.map((i) => i.id).join(",")
            router.replace(`/compare?ids=${ids}`)
        } else {
            router.replace("/compare")
            setProducts([])
        }
    }

    if (loading) {
        return (
            <div className="container py-12 text-center">
                <p className="text-muted-foreground">Đang tải dữ liệu so sánh...</p>
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">So sánh sản phẩm</h1>
                <p className="text-muted-foreground mb-8">
                    Bạn chưa chọn sản phẩm nào để so sánh.
                </p>
                <Button asChild>
                    <Link href="/products">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Quay lại danh sách sản phẩm
                    </Link>
                </Button>
            </div>
        )
    }

    // Extract all unique spec keys
    const allSpecKeys = Array.from(
        new Set(
            products.flatMap((p) =>
                p.specifications ? Object.keys(p.specifications) : []
            )
        )
    )

    return (
        <div className="container py-8 overflow-x-auto">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold">So sánh sản phẩm</h1>
                <Button variant="outline" asChild>
                    <Link href="/products">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Thêm sản phẩm
                    </Link>
                </Button>
            </div>

            <div className="min-w-[800px]">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 border-b w-40 bg-muted/50 text-left">Thông tin</th>
                            {products.map(product => (
                                <th key={product.id} className="p-4 border-b w-80 align-top relative">
                                    <button
                                        onClick={() => handleRemove(product.id)}
                                        className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                    <Link href={`/products/${product.slug}`} className="block">
                                        <div className="aspect-square relative rounded-lg overflow-hidden mb-4 border bg-background">
                                            <Image
                                                src={product.images[0] || '/placeholder.jpg'}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <h3 className="font-semibold text-base line-clamp-2 hover:text-primary mb-2">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <div className="flex flex-col gap-2 items-start">
                                        <span className="font-bold text-lg text-primary">{formatPrice(product.price)}</span>
                                        <Button asChild size="sm" className="w-full">
                                            <Link href={`/products/${product.slug}`}>Chi tiết</Link>
                                        </Button>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-4 font-semibold text-muted-foreground bg-muted/20">Thương hiệu</td>
                            {products.map(product => (
                                <td key={product.id} className="p-4 text-center">
                                    <Badge variant="outline">{product.brand}</Badge>
                                </td>
                            ))}
                        </tr>
                        <tr className="border-b">
                            <td className="p-4 font-semibold text-muted-foreground bg-muted/20">Loại máy</td>
                            {products.map(product => (
                                <td key={product.id} className="p-4 text-center">
                                    {product.inverter ? (
                                        <Badge>Inverter</Badge>
                                    ) : (
                                        <span className="text-sm">Thường</span>
                                    )}
                                </td>
                            ))}
                        </tr>
                        <tr className="border-b">
                            <td className="p-4 font-semibold text-muted-foreground bg-muted/20">Công suất</td>
                            {products.map(product => (
                                <td key={product.id} className="p-4 text-center">
                                    {product.horsepower}
                                </td>
                            ))}
                        </tr>

                        {allSpecKeys.map(key => (
                            <tr key={key} className="border-b hover:bg-muted/50 transition-colors">
                                <td className="p-4 font-medium text-muted-foreground bg-muted/10">{key}</td>
                                {products.map(product => (
                                    <td key={product.id} className="p-4 text-center">
                                        {product.specifications?.[key] || '---'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
