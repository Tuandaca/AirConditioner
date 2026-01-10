'use client'

import { Zap, Wrench, Shield, Clock, Users, Headphones } from 'lucide-react'
import { motion } from 'framer-motion'

const benefits = [
  {
    icon: Zap,
    title: 'Tiết kiệm điện',
    description: 'Công nghệ Inverter tiết kiệm điện lên đến 70% so với máy thường',
  },
  {
    icon: Wrench,
    title: 'Lắp đặt nhanh',
    description: 'Đội ngũ kỹ thuật chuyên nghiệp, lắp đặt trong ngày',
  },
  {
    icon: Shield,
    title: 'Bảo hành chính hãng',
    description: 'Bảo hành 12 tháng, hỗ trợ kỹ thuật 24/7',
  },
  {
    icon: Clock,
    title: 'Giao hàng nhanh',
    description: 'Giao hàng tận nơi, hỗ trợ trong vòng 24h',
  },
  {
    icon: Users,
    title: 'Tư vấn miễn phí',
    description: 'Đội ngũ tư vấn chuyên nghiệp, hỗ trợ chọn máy phù hợp',
  },
  {
    icon: Headphones,
    title: 'Hỗ trợ kỹ thuật',
    description: 'Hỗ trợ kỹ thuật trọn đời, sửa chữa nhanh chóng',
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Tại sao chọn chúng tôi?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cam kết mang đến dịch vụ tốt nhất cho khách hàng
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}