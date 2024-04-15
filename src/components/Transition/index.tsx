import { twMerge } from 'tailwind-merge'
import { DefaultTransition } from './constants'
import { type ITransitionProps } from './types'

function Transition ({
  children,
  className,
  show,
  appear,
  beforeEnter,
  afterEnter,
  beforeLeave,
  afterLeave,
  animation,
  onClick,
  TransitionComponent = DefaultTransition
}: ITransitionProps): JSX.Element {
  return (animation != null)
    ? (
      <div
        className={twMerge(
          show && animation.enter.includes('animatecss') && `animate__animated animate__faster animate__${animation.enter.replace('animatecss_', '')}`,
          !show && animation.exit.includes('animatecss') && `animate__animated animate__faster animate__${animation.exit.replace('animatecss_', '')}`,
          show && animation.enter.includes('magiccss') && `magictime ${animation.enter.replace('magiccss_', '')}`,
          !show && animation.exit.includes('magiccss') && `magictime ${animation.exit.replace('magiccss_', '')}`,
          className
        )}
        onAnimationStart={() => {
          if (show) {
            beforeEnter?.()
          } else {
            beforeLeave?.()
          }
        }}
        onAnimationEnd={() => {
          if (!show) {
            afterLeave?.()
          } else {
            afterEnter?.()
          }
        }}
        onClick={onClick}
      >
        {children}
      </div>
      )
    : (
      <TransitionComponent
        show={show}
        appear={appear}
        beforeEnter={beforeEnter}
        afterEnter={afterEnter}
        beforeLeave={beforeLeave}
        afterLeave={afterLeave}
        onClick={onClick}
      >
        {children}
      </TransitionComponent>
      )
}

export default Transition
