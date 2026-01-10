import Link from 'next/link'
import { Facebook, Phone, MapPin, Mail } from 'lucide-react'

const FACEBOOK_URL = 'https://facebook.com/yourpage'
const ZALO_URL = 'https://zalo.me/0912345678'
const PHONE_NUMBER = 'tel:0912345678'
const EMAIL = 'mailto:contact@example.com'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Máy lạnh Việt Nam</h3>
            <p className="mb-4 leading-relaxed">
              Chuyên cung cấp máy lạnh chính hãng, lắp đặt tận nơi với giá tốt nhất thị trường.
            </p>
            <div className="flex gap-4">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#0068FF] rounded-full flex items-center justify-center hover:bg-[#0052CC] transition-colors"
                aria-label="Zalo"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 5.58 2 10c0 2.86 1.58 5.41 4 6.86V22l4-2.2c.67.09 1.35.14 2 .14 5.52 0 10-3.58 10-8s-4.48-8-10-8zm-2 12l-4-4 1.41-1.41L10 11.17l6.59-6.59L18 6l-8 8z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/#benefits" className="hover:text-white transition-colors">
                  Ưu điểm
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href={PHONE_NUMBER} className="hover:text-white transition-colors">
                  0912 345 678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href={EMAIL} className="hover:text-white transition-colors">
                  contact@example.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span>
                  123 Đường ABC, Quận XYZ, TP.HCM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Máy lạnh Việt Nam. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}