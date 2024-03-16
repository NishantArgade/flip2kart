export function getPascalCaseString(str) {
  str = str.trim()
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function getAddressString(addressObj) {
  return [
    addressObj?.street,
    addressObj?.landmark,
    addressObj?.city,
    addressObj?.state,
    addressObj?.country,
    addressObj?.pincode,
  ]
    .filter(Boolean)
    .join(", ")
}

export function calculateDiscountedPrice(
  originalPrice,
  discountRate,
  quantity = 1
) {
  discountRate = discountRate / 100

  if (discountRate === 1) {
    return 0
  }
  const discountedPrice = originalPrice * (1 - discountRate)
  let price = Math.floor(discountedPrice / 100) * 100 - 1
  return (price = price * quantity)
}

export const categoryPriceRanges = {
  mobile: { min: 10000, max: 30000 },
  clothes: { min: 300, max: 1000 },
  laptop: { min: 20000, max: 75000 },
  books: { min: 100, max: 1000 },
}

export function calculateDiscountAmount(originalPrice, discountRate) {
  discountRate = discountRate / 100

  if (discountRate === 1) {
    return originalPrice
  }

  const discountedPrice = originalPrice * (1 - discountRate)
  const price = Math.floor(discountedPrice / 100) * 100 - 1
  const discountAmount = originalPrice - price

  return discountAmount
}
