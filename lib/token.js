import { randomBytes } from "crypto"

export function generateToken() {
  const buffer = randomBytes(32)
  return buffer.toString("hex")
}
