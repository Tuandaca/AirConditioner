"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewBannerPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            title: formData.get("title"),
            imageUrl: formData.get("imageUrl"),
            link: formData.get("link"),
            order: parseInt(formData.get("order") as string) || 0,
            active: formData.get("active") === "on",
        }

        try {
            const response = await fetch("/api/admin/banners", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                router.push("/admin/banners")
                router.refresh()
            } else {
                alert("Có lỗi xảy ra khi tạo banner")
            }
        } catch (error) {
            alert("Có lỗi xảy ra khi tạo banner")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Thêm Banner Mới</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="imageUrl">URL Hình ảnh *</Label>
                            <Input
                                id="imageUrl"
                                name="imageUrl"
                                placeholder="https://example.com/banner.jpg"
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                Copy link ảnh từ trang Media hoặc upload lên host khác.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Tiêu đề (Tùy chọn)</Label>
                            <Input id="title" name="title" placeholder="Banner khuyến mãi hè" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="link">Link liên kết (Tùy chọn)</Label>
                            <Input id="link" name="link" placeholder="/products/khuyen-mai" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order">Thứ tự hiển thị</Label>
                            <Input
                                id="order"
                                name="order"
                                type="number"
                                defaultValue="0"
                                min="0"
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="active" name="active" defaultChecked />
                            <Label htmlFor="active">Kích hoạt hiển thị</Label>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                Hủy
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Đang tạo..." : "Tạo Banner"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
