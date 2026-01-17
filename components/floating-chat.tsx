'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, X, Phone } from 'lucide-react'
import { getZaloChatUrl } from '@/lib/settings'

interface SiteSettings {
  phoneNumber: string
  zaloNumber: string
  facebookUrl: string
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    // Fetch settings from API
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((error) => {
        console.error('Error fetching settings:', error)
        // Fallback values
        setSettings({
          phoneNumber: '0917940833',
          zaloNumber: '0917940833',
          facebookUrl: 'https://www.facebook.com/ngobongsu',
        })
      })
  }, [])

  if (!settings) {
    return null // Don't render until settings are loaded
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3">
        {isOpen && (
          <div className="bg-card border rounded-lg shadow-lg p-4 mb-3 w-64 sm:w-72 max-w-[calc(100vw-2rem)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Liên hệ với chúng tôi</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Button
                asChild
                className="w-full justify-start"
                variant="outline"
              >
                <a
                  href={getZaloChatUrl(settings.zaloNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat Zalo
                </a>
              </Button>
              <Button
                asChild
                className="w-full justify-start"
                variant="outline"
              >
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat Facebook
                </a>
              </Button>
              <Button
                asChild
                className="w-full justify-start"
                variant="default"
              >
                <a href={`tel:${settings.phoneNumber}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Gọi ngay: {settings.phoneNumber}
                </a>
              </Button>
            </div>
          </div>
        )}
        <Button
          size="lg"
          className="rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-xl hover:shadow-2xl transition-all hover:scale-110 text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Liên hệ với chúng tôi"
        >
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
        </Button>
      </div>
    </>
  )
}
