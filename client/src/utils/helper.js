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

export function calculateDiscountedPrice(originalPrice, discountRate) {
  discountRate = discountRate / 100

  if (discountRate === 1) {
    return 0
  }
  const discountedPrice = originalPrice * (1 - discountRate)
  const price = Math.floor(discountedPrice / 100) * 100 - 1
  return price.toLocaleString()
}

export const categoryPriceRanges = {
  mobile: { min: 10000, max: 30000 },
  clothes: { min: 300, max: 1000 },
  laptop: { min: 20000, max: 75000 },
  books: { min: 100, max: 1000 },
}
