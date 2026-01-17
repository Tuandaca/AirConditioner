import { getSiteSettings } from '@/lib/settings'
import { SettingsForm } from '@/components/admin/settings-form'

export default async function SettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Cài đặt</h1>
      <SettingsForm
        initialValues={{
          phoneNumber: settings.phoneNumber,
          zaloNumber: settings.zaloNumber,
          facebookUrl: settings.facebookUrl,
        }}
      />
    </div>
  )
}
