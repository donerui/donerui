import { type creditCardPresets } from './presets'

export interface CreditCardProps {
  className?: string
  cardNumber?: string
  cardHolder?: string
  cardHolderMaxLength?: number
  expiryMonth?: string
  expiryYear?: string
  cvv?: string
  view?: CreditCardSide
  preset?: keyof typeof creditCardPresets
  customPresets?: typeof creditCardPresets
  forcePreset?: CreditCardPreset
}

export type CreditCardSide = 'front' | 'back'

export interface CreditCardPreset {
  simCardChipIcon?: {
    backgroundColor?: string
    foregroundColor?: string
  }
  mastercardLogo?: {
    leftCircleColor?: string
    rightCircleColor?: string
    middleCircleColor?: string
  }
  visaLogo?: {
    color?: string
  }
  cardClassName?: string
  brandNameClassName?: string
  cardNumberClassName?: string
  validThruClassName?: string
  validThruArrowClassName?: string
  expiryClassName?: string
  cardHolderClassName?: string
  stripeClassName?: string
  cvvStripeClassName?: string
  cvvClassName?: string
}
