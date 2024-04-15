import { minBy } from 'lodash'

export function findClosestNumberSorted (arr: number[], target: number): number {
  let start = 0
  let end = arr.length - 1

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)

    if (arr[mid] === target) {
      return arr[mid]
    } else if (arr[mid] < target) {
      start = mid + 1
    } else {
      end = mid - 1
    }
  }

  // Find the closest number among arr[start], arr[end] and target
  const candidates = [arr[start], arr[end]]
  return minBy(candidates, (num) => Math.abs(num - target)) ?? target
}

export function findClosestNumber (arr: number[], target: number): number {
  return minBy(arr, (num) => Math.abs(num - target)) ?? target
}
