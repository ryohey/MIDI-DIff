// polyfill for jasmid
import { TextDecoder } from "text-encoding"
const g = global as any
g.TextDecoder = TextDecoder

export * from "jasmid.ts"
