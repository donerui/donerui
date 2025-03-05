import { inverseLerpClamped } from '@donerui/base'
import { interpolateHsl } from 'd3'

export function mapColor (value: number, min1: number, max1: number, min2: string, max2: string): string {
  return interpolateHsl(min2, max2)(inverseLerpClamped(min1, max1, value))
}
