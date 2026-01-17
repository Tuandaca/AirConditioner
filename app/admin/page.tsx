import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth-helpers'
import AdminDashboard from './dashboard'

// /admin route - redirect to login if not authenticated, otherwise show dashboard
export default async function AdminPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/admin/login')
  }

  return <AdminDashboard />
}
