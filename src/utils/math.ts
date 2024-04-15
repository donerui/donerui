export function lerp (a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function inverseLerp (a: number, b: number, v: number): number {
  return (v - a) / (b - a)
}

export function clamp (value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function clamp01 (value: number): number {
  return clamp(value, 0, 1)
}

export function lerpClamped (a: number, b: number, t: number): number {
  return lerp(a, b, clamp01(t))
}

export function inverseLerpClamped (a: number, b: number, v: number): number {
  return clamp01(inverseLerp(a, b, v))
}

export function map (value: number, min1: number, max1: number, min2: number, max2: number): number {
  return lerp(min2, max2, inverseLerp(min1, max1, value))
}

export function multiplyWithPercentage (num: number, percentageString: string): number {
  const percentage = parseFloat(percentageString.replace('%', ''))
  return num * (percentage / 100)
}
