"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface BannerActionsProps {
    bannerId: string
}

export function BannerActions({ bannerId }: BannerActionsProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        if (!confirm("Bạn có chắc chắn muốn xóa banner này?")) {
            return
        }

        setLoading(true)
        try {
            const response = await fetch(`/api/admin/banners/${bannerId}`, {
                method: "DELETE",
            })

            if (response.ok) {
                router.refresh()
            } else {
                alert("Có lỗi xảy ra khi xóa banner")
            }
        } catch (error) {
            alert("Có lỗi xảy ra khi xóa banner")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
