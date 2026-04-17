/** Returns all permutations of an array (including duplicates if array has dupes) */
export function permutations<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr.slice()]
  const result: T[][] = []
  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i]
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)]
    for (const perm of permutations(rest)) {
      result.push([elem, ...perm])
    }
  }
  return result
}
