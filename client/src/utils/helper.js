export function getPascalCaseString(str) {
  str = str.trim()
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}
