'use client'

import { MessageCircle, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const ZALO_URL = 'https://zalo.me/0912345678' // Replace with your Zalo ID
const FACEBOOK_URL = 'https://m.me/yourpage' // Replace with your Facebook page
const PHONE_NUMBER = 'tel:0912345678' // Replace with your phone number

export function FloatingChat() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Zalo Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <a
          href={ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-[#0068FF] hover:bg-[#0052CC] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Chat Zalo"
          >
            <span className="text-xl font-bold text-white">Z</span>
          </Button>
        </a>
      </motion.div>

      {/* Facebook Messenger Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-[#0084FF] hover:bg-[#0066CC] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Facebook Messenger"
          >
            <MessageCircle className="h-7 w-7 text-white" />
          </Button>
        </a>
      </motion.div>

      {/* Phone Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
      >
        <a href={PHONE_NUMBER} className="group">
          <Button
            size="lg"
            className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Gọi ngay"
          >
            <Phone className="h-7 w-7 text-white" />
          </Button>
        </a>
      </motion.div>
    </div>
  )
}