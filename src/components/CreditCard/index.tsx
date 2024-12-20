import { useEffect, useState, type ReactNode } from 'react'
import { MdArrowRight } from 'react-icons/md'
import { twMerge } from 'tailwind-merge'
import MastercardLogo from './Icons/MastercardLogo'
import SimCardChipIcon from './Icons/SimCardChipIcon'
import VisaLogo from './Icons/VisaLogo'
import { creditCardPresets } from './presets'
import { type CreditCardProps, type CreditCardSide } from './types'

export * from './Icons'
export * from './presets'
export * from './types'

// aspect ratio 85.60 mm / 53.98 mm = 1,5857
export default function CreditCard ({
  className,
  cardNumber = '0123 4567 8910 1112',
  cardHolder = 'John Doe',
  expiryMonth = '01',
  expiryYear = '23',
  cvv = '123',
  view,
  preset,
  customPresets,
  forcePreset
}: CreditCardProps): ReactNode {
  const isViewControlled = view !== undefined
  const [viewInternal, setViewInternal] = useState<CreditCardSide>(isViewControlled ? view : 'front')

  const nonSpaceCardNumber = cardNumber.replace(/\s/g, '').slice(0, 16)
  const spacedCardNumber = nonSpaceCardNumber.replace(/(.{4})/g, '$1 ')

  const isVisa = spacedCardNumber?.startsWith('4')
  const isMastercard = spacedCardNumber?.startsWith('5')

  const bin = nonSpaceCardNumber?.slice(0, 6)
  const internalPreset = preset ?? (bin.length === 6 ? bin : 'default')

  const unionPresets = customPresets !== undefined ? { ...creditCardPresets, ...customPresets } : creditCardPresets
  const activePreset = forcePreset ?? unionPresets[internalPreset] ?? unionPresets.default

  useEffect(() => {
    if (isViewControlled) {
      setViewInternal(view)
    }
  }, [view])

  return (
    <div
      className={twMerge(
        'relative aspect-[1.5857] h-60 rounded-2xl shadow-md duration-300 transform-gpu',
        !isViewControlled && 'cursor-pointer',
        activePreset.cardClassName,
        className
      )}
      style={{
        transform: `rotateY(${viewInternal === 'front' ? 0 : 180}deg)`
      }}
      onClick={() => {
        if (!isViewControlled) {
          setViewInternal(viewInternal === 'front' ? 'back' : 'front')
        }
      }}
    >
      {/* Front */}
      <div
        className={twMerge(
          'absolute inset-0 px-6 py-4 duration-100 transform-gpu',
          viewInternal === 'back' ? 'opacity-0 scale-x-0' : 'delay-100'
        )}
      >
        <div className={twMerge('duration-200', activePreset.brandNameClassName)}>Axess</div>

        <SimCardChipIcon
          backgroundColor={activePreset.simCardChipIcon?.backgroundColor}
          foregroundColor={activePreset.simCardChipIcon?.foregroundColor}
        />

        <div className={twMerge('duration-200', activePreset.cardNumberClassName)}>{spacedCardNumber}</div>
        <div className="flex items-center mt-4">
          <div className={twMerge('duration-200', activePreset.validThruClassName)}>
            <p>VALID</p>
            <p>THRU</p>
          </div>
          <MdArrowRight className={twMerge('size-5 duration-200', activePreset.validThruArrowClassName)} />
          <div className={twMerge('duration-200', activePreset.expiryClassName)}>{expiryMonth}/{expiryYear}</div>
        </div>

        <div className="absolute bottom-4 left-6 right-6 h-8 flex justify-between items-center">
          <span className={twMerge('duration-200', activePreset.cardHolderClassName)}>{cardHolder}</span>

          {isVisa && (
            <VisaLogo
              className='h-12 w-16'
              color={activePreset.visaLogo?.color}
            />
          )}
          {isMastercard && (
            <MastercardLogo
              className='h-12 w-16'
              leftCircleColor={activePreset.mastercardLogo?.leftCircleColor}
              rightCircleColor={activePreset.mastercardLogo?.rightCircleColor}
              middleCircleColor={activePreset.mastercardLogo?.middleCircleColor}
            />
          )}
        </div>
      </div>

      {/* Back */}
      <div
        className={twMerge(
          'absolute inset-0 duration-100 transform-gpu -scale-x-100',
          viewInternal === 'front' ? 'opacity-0 scale-x-0' : 'delay-100'
        )}
      >
        <div className={twMerge('mt-6 h-8', activePreset.stripeClassName)} />
        <div className={twMerge('relative mt-6 h-8 ml-8 w-4/6', activePreset.cvvStripeClassName)} >
          <span className={twMerge('absolute top-0 bottom-0 right-2', activePreset.cvvClassName)}>
            {cvv}
          </span>
        </div>
      </div>
    </div>
  )
}
