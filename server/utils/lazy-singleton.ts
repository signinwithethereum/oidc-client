import type { H3Event } from 'h3'

export function lazySingleton<T>(
  fn: (event: H3Event) => Promise<T>,
): (event: H3Event) => Promise<T> {
  let pending: Promise<T> | null = null
  return (event: H3Event) => {
    if (!pending) {
      pending = fn(event)
      pending.catch(() => { pending = null })
    }
    return pending
  }
}
