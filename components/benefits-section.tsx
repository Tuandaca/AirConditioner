import { Check } from 'lucide-react'

interface BenefitsSectionProps {
  benefits: string[]
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  if (!benefits || benefits.length === 0) return null

  return (
    <div className="bg-muted/50 rounded-lg p-6">
      <h3 className="font-semibold text-lg mb-4">Điểm nổi bật</h3>
      <ul className="space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
