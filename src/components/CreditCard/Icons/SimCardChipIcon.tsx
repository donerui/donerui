import { type ReactNode } from 'react'

interface SimCardChipIconProps {
  backgroundColor?: string
  foregroundColor?: string
}

export default function SimCardChipIcon ({
  backgroundColor = '#FF9800',
  foregroundColor = '#FFD54F'
}: SimCardChipIconProps): ReactNode {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="4 4 40 40" enableBackground="new 4 4 40 40" className="size-14" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path fill={backgroundColor} d="M5,35V13c0-2.2,1.8-4,4-4h30c2.2,0,4,1.8,4,4v22c0,2.2-1.8,4-4,4H9C6.8,39,5,37.2,5,35z"></path>
      <g fill={foregroundColor}>
        <path d="M43,21v-2H31c-1.1,0-2-0.9-2-2s0.9-2,2-2h1v-2h-1c-2.2,0-4,1.8-4,4s1.8,4,4,4h3v6h-3c-2.8,0-5,2.2-5,5 s2.2,5,5,5h2v-2h-2c-1.7,0-3-1.3-3-3s1.3-3,3-3h12v-2h-7v-6H43z"></path>
        <path d="M17,27h-3v-6h3c2.2,0,4-1.8,4-4s-1.8-4-4-4h-3v2h3c1.1,0,2,0.9,2,2s-0.9,2-2,2H5v2h7v6H5v2h12 c1.7,0,3,1.3,3,3s-1.3,3-3,3h-2v2h2c2.8,0,5-2.2,5-5S19.8,27,17,27z"></path>
      </g>
    </svg>
  )
}