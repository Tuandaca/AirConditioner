import { prisma } from './prisma'
import { CONTACT_INFO } from './constants'

export interface SiteSettings {
  phoneNumber: string
  zaloNumber: string
  facebookUrl: string
}

/**
 * Get site settings from database
 * Returns default values if no settings exist
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    // Try to get from new SiteSettings model first
    const siteSettings = await prisma.siteSettings.findFirst({
      orderBy: { updatedAt: 'desc' },
    })

    if (siteSettings) {
      return {
        phoneNumber: siteSettings.phoneNumber,
        zaloNumber: siteSettings.zaloNumber,
        facebookUrl: siteSettings.facebookUrl,
      }
    }

    // Fallback to old Settings key-value model for migration
    const [phone, zalo, facebook] = await Promise.all([
      prisma.settings.findUnique({ where: { key: 'phoneNumber' } }),
      prisma.settings.findUnique({ where: { key: 'zaloNumber' } }),
      prisma.settings.findUnique({ where: { key: 'facebookUrl' } }),
    ])

    if (phone || zalo || facebook) {
      return {
        phoneNumber: phone?.value || CONTACT_INFO.phone,
        zaloNumber: zalo?.value || CONTACT_INFO.zalo,
        facebookUrl: facebook?.value || CONTACT_INFO.facebook,
      }
    }

    // Ultimate fallback
    return {
      phoneNumber: CONTACT_INFO.phone,
      zaloNumber: CONTACT_INFO.zalo,
      facebookUrl: CONTACT_INFO.facebook,
    }
  } catch (error) {
    console.error('Error fetching site settings:', error)
    // Return defaults on error
    return {
      phoneNumber: CONTACT_INFO.phone,
      zaloNumber: CONTACT_INFO.zalo,
      facebookUrl: CONTACT_INFO.facebook,
    }
  }
}

/**
 * Generate Zalo chat URL for direct conversation
 * Format: https://zalo.me/{phone_number}
 */
export function getZaloChatUrl(zaloNumber: string): string {
  // Remove any non-digit characters
  const cleanNumber = zaloNumber.replace(/\D/g, '')
  return `https://zalo.me/${cleanNumber}`
}
