// This layout ensures login page is not wrapped by admin layout
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
