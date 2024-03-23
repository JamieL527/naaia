import dayjs from "dayjs"

export function dateOffset(n = 0, unit = "minute", base = new Date()) {
  let shiftedNow
  if (n >= 0) {
    shiftedNow = dayjs(base).add(n, unit)
  } else {
    shiftedNow = dayjs(base).subtract(Math.abs(n), unit)
  }

  return new Date(shiftedNow.format())
}
