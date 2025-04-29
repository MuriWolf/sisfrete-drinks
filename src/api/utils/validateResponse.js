const CODES = {
  ok: 0,
  error: 1,
  null: 2,
}

export default function validateResponse(response) {
  if (typeof response === typeof Error) {
    return CODES.error
  }
  if (response === null) {
    return CODES.null
  }
  return CODES.ok
}
