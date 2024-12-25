import { type CreditCardPreset } from './types'

export const creditCardPresets: Record<string, CreditCardPreset> = {
  default: {
    cardClassName: 'bg-gray-50',
    brandNameClassName: 'text-gray-800 text-2xl font-bold',
    cardNumberClassName: 'text-gray-800 text-3xl font-bold',
    validThruClassName: 'text-gray-800 text-[6pt]',
    validThruArrowClassName: 'text-gray-800',
    expiryClassName: 'text-gray-800 text-lg font-semibold',
    cardHolderClassName: 'text-gray-800 text-lg font-semibold',
    stripeClassName: 'bg-gray-800',
    cvvStripeClassName: 'bg-gray-800',
    cvvClassName: 'text-xl font-semibold text-white'
  },
  521807: {
    simCardChipIcon: {
      backgroundColor: 'lightgray',
      foregroundColor: 'gray'
    },
    mastercardLogo: {
      leftCircleColor: '#ccc',
      rightCircleColor: '#eee',
      middleCircleColor: '#ddd'
    },
    visaLogo: {
      color: 'white'
    },
    cardClassName: 'bg-amber-400',
    brandNameClassName: 'text-white text-2xl font-bold',
    cardNumberClassName: 'text-white text-3xl font-bold',
    validThruClassName: 'text-white text-[6pt]',
    validThruArrowClassName: 'text-white',
    expiryClassName: 'text-white text-lg font-semibold',
    cardHolderClassName: 'text-white text-lg font-semibold',
    stripeClassName: 'bg-gray-100',
    cvvStripeClassName: 'bg-gray-100',
    cvvClassName: 'text-xl font-semibold text-gray-500'
  }
}
