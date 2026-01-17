"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface ProductSummary {
    id: string
    name: string
    price: number
    image: string
    brand: string
    slug: string
}

interface CompareContextType {
    items: ProductSummary[]
    addItem: (product: ProductSummary) => void
    removeItem: (id: string) => void
    isInCompare: (id: string) => boolean
    clearCompare: () => void
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<ProductSummary[]>([])

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem("compare_items")
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error("Error parsing compare items", e)
            }
        }
    }, [])

    // Save to local storage
    useEffect(() => {
        localStorage.setItem("compare_items", JSON.stringify(items))
    }, [items])

    const addItem = (product: ProductSummary) => {
        if (items.length >= 3) {
            alert("Bạn chỉ có thể so sánh tối đa 3 sản phẩm")
            return
        }
        if (items.some((i) => i.id === product.id)) return
        setItems([...items, product])
    }

    const removeItem = (id: string) => {
        setItems(items.filter((i) => i.id !== id))
    }

    const isInCompare = (id: string) => items.some((i) => i.id === id)

    const clearCompare = () => setItems([])

    return (
        <CompareContext.Provider
            value={{ items, addItem, removeItem, isInCompare, clearCompare }}
        >
            {children}
        </CompareContext.Provider>
    )
}

export function useCompare() {
    const context = useContext(CompareContext)
    if (context === undefined) {
        throw new Error("useCompare must be used within a CompareProvider")
    }
    return context
}
