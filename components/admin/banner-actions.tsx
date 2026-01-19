"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { toast } from "sonner"

interface BannerActionsProps {
    bannerId: string
}

export function BannerActions({ bannerId }: BannerActionsProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        setShowConfirm(false)

        try {
            const response = await fetch(`/api/admin/banners/${bannerId}`, {
                method: "DELETE",
            })

            if (response.ok) {
                toast.success("Đã xóa banner thành công")
                router.refresh()
            } else {
                toast.error("Có lỗi xảy ra khi xóa banner")
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa banner")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowConfirm(true)}
                disabled={loading}
            >
                <Trash2 className="h-4 w-4" />
            </Button>

            <ConfirmDialog
                open={showConfirm}
                onOpenChange={setShowConfirm}
                onConfirm={handleDelete}
                title="Xóa banner"
                description="Bạn có chắc chắn muốn xóa banner này? Hành động này không thể hoàn tác."
                confirmText="Xóa"
                cancelText="Hủy"
            />
        </>
    )
}
