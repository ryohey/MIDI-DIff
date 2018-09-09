export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined
}
