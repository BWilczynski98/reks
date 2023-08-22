export const formatPostalCode = (postalCode: string): string => {
  const numericInput = postalCode.replace(/\D/g, "")
  const regex = /^(\d{2})(\d{3})$/

  if (regex.test(numericInput)) {
    return numericInput.replace(regex, "$1-$2")
  }

  return numericInput
}
