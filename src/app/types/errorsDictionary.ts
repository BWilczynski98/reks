export enum Errors {
  EMPTY_FIELD = "To pole nie może być puste",
  INCORRECT_EMAIL = "Podane adres email jest nie poprawny",
  LOWERCASE_EMAIL = "Adres email nie może składać się z wielkich liter",
  INCORRECT_PASSWORD = "Podane hasło jest nie poprawne",
  INCORRECT_REGEX_PASSWORD = "Hasło zawiera niedozwolone znaki",
  INCORRECT_CONFIRM_PASSWORD = "Hasła muszą być takie same",
  MIN_LENGTH_PASSWORD = "Hasło musi się składać z conajmniej 6 znaków",
}

export enum RequestErrors {
  EMAIL_EXIST = "This email address is already exist",
  EMPTY_DATA = "Please enter an email and password",
  NO_USER_FOUND = "No user found",
  INCORRECT_PASSWORD = "Incorrect password",
}
