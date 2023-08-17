export enum Errors {
  EMPTY_FIELD = "To pole nie może być puste",
  INCORRECT_NUMBER = "To pole może się składać tylko z cyfr",
  INCORRECT_EMAIL = "Podane adres email jest nie poprawny",
  LOWERCASE_EMAIL = "Adres email nie może składać się z wielkich liter",
  INCORRECT_PASSWORD = "Podane hasło jest nie poprawne",
  INCORRECT_REGEX = "Pole zawiera niedozwolone znaki",
  INCORRECT_REGEX_PASSWORD = "Hasło zawiera niedozwolone znaki",
  INCORRECT_CONFIRM_PASSWORD = "Hasła muszą być takie same",
  INCORRECT_DATE = "Podana data jest niepoprawna",
  MIN_LENGTH_PASSWORD = "Hasło musi się składać z conajmniej 6 znaków",
  MIN_LENGTH_POSTAL_CODE = "Kod pocztowy jest za krótki. Powinien składać się z 5 znaków",
  MAX_LENGTH_POSTAL_CODE = "Kod pocztowy jest za długi. Powinien składać się z 5 znaków",
  MIN_LEGTH_PHONE_NUMBER = "Numer telefonu jest za krótki. Powinien składać się z 9 znaków",
  MAX_LEGTH_PHONE_NUMBER = "Numer telefonu jest za długi. Powinien składać się z 9 znaków",
}

export enum RequestErrors {
  EMAIL_EXIST = "This email address is already exist",
  EMPTY_DATA = "Please enter an email and password",
  NO_USER_FOUND = "No user found",
  INCORRECT_PASSWORD = "Incorrect password",
  PASSWORD_RESET_REQUEST_EXIST = "Password reset request already exists for this email address",
  OUTDATED_TOKEN = "Token is after the deadline",
  IS_USED_TOKEN = "Token is used up",
}
