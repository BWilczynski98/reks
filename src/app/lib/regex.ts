export const regex = {
  names: /^(?!.*[])[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ/\s/]+$/,
  addresses: /^(?!.*[])[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ//\s/\.]+$/,
  addressesWithoutNumber: /^(?!.*[])[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ/\s/]+$/,
  numbersWithoutSigns: /^(?!.*[a-zA-Z!@#$%^&*()=+])[0-9]+$/,
  withoutSpecialAndPolishLanguageCharacters: /^(?!.*[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ])[a-zA-Z0-9!@#$%^&*()-_=+]+$/,
}
