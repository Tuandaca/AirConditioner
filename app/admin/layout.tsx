import { AdminNavbar } from '@/components/admin/navbar'

// Admin layout - completely isolated from customer UI
// No customer navbar, footer, or any customer components
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-muted/50">
      <AdminNavbar />
      <main className="container px-4 md:px-6 py-4 md:py-8">{children}</main>
    </div>
  )
}
