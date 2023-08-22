export const formatPhoneNumber = (phoneNumber: string): string => {
  const numericInput = phoneNumber.replace(/\D/g, "")
  const regex = /^(\d{3})(\d{3})(\d{3})$/

  if (regex.test(numericInput)) {
    return numericInput.replace(regex, "$1-$2-$3")
  }

  return numericInput
}
