import { useEffect, useRef, useState, type ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'
import { type IFlipProps } from './Flip.types'

function Flip({
  className,
  front,
  back,
  startFlip
}: IFlipProps): ReactElement {
  const [flipStarted, setFlipStarted] = useState(false)
  const [flipEnded, setFlipEnded] = useState(false)
  const actionTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (startFlip) {
      console.log('startFlip')
      setFlipStarted(true)
      setFlipEnded(false)
      actionTimeout.current = setTimeout(() => {
        console.log('endFlip')
        setFlipStarted(false)
        setFlipEnded(true)
      }, 850)
    }
  }, [startFlip])

  return (
    <div className={twMerge(className, 'relative perspective-normal w-[68px] h-[66px] bg-[hsl(236,21%,26%)]')}>
      <div className="absolute bottom-0 w-full h-1/2 grid place-content-center overflow-hidden">
        <span className="front -translate-y-[calc(50%-1.5px)] md:-translate-y-[calc(50%-5px)]">
          {flipEnded ? front : back}
        </span>
      </div>
      <div className="absolute top-0 w-full h-1/2">
        <div className="w-full h-full grid place-content-center overflow-hidden">
          <span className="back translate-y-[calc(50%-1.5px)] md:translate-y-[calc(50%-5px)]">
            {back}
          </span>
        </div>
      </div>
      <div className={twMerge('duration-[850ms] ease-[cubic-bezier(1,0.24,0.65,0.95)] transform-3d origin-bottom relative w-[68px] h-[33px]', flipStarted ? '[transform:rotateX(-180deg)] transition-transform' : 'transition-none')} >
        <div className="backface-hidden rotate-x-0 absolute z-20 w-full h-full">
          <div className="w-full h-full grid place-content-center overflow-hidden">
            <span className="front translate-y-[calc(50%-1.5px)] md:translate-y-[calc(50%-5px)]">
              {flipEnded ? front : back}
            </span>
          </div>
        </div>
        <div className="backface-hidden rotate-x-180 grid place-content-center absolute z-10 w-full h-full overflow-hidden">
          <span className="back -translate-y-[calc(50%-1.5px)] md:-translate-y-[calc(50%-5px)]">
            {back}
          </span>
        </div>
      </div>
      {/* <span className="rounded-full h-1.5 w-1.5 absolute left-0 top-1/2 -translate-y-[3px] -translate-x-1/2 md:h-3 md:w-3 md:-translate-y-1.5"></span>
      <span className="rounded-full h-1.5 w-1.5 absolute right-0 top-1/2 -translate-y-[3px] translate-x-1/2 md:h-3 md:w-3 md:-translate-y-1.5"></span> */}
    </div>
  )
}

export default Flip

{ /* <div className="group h-96 w-96 [perspective:1000px]">
        <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
          <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
            <div className="flex min-h-full flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Front</h2>
            </div>
          </div>
          <div className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateX(180deg)] [backface-visibility:hidden]">
            <div className="flex min-h-full flex-col items-center justify-center">
              <h2 className="text-2xl font-bold mb-4">Back</h2>
            </div>
          </div>
        </div>
      </div> */ }
