import type { Severity as SeverityType } from "@/app/types/alert"
import { RequestErrors } from "@/app/types/errorsDictionary"
import { useState } from "react"

type Props = {
  severity: SeverityType | null
  message: string
  isOpen: boolean
}

export const useAlert = () => {
  const [alert, setAlert] = useState<Props>({ severity: null, message: "", isOpen: false })

  const handleOpen = ({ severity, data }: { severity: SeverityType; data: string }) => {
    let message = ""

    switch (data) {
      case RequestErrors.EMAIL_EXIST:
        message = "Istnieje już konto o takim adresie email"
        break
      case RequestErrors.EMPTY_DATA:
        message = "Wprowadź adres e-mail i hasło"
        break
      case RequestErrors.NO_USER_FOUND:
        message = "Nie znaleziono konta o takim adresie email"
        break
      case RequestErrors.INCORRECT_PASSWORD:
        message = "Podane hasło jest nieprawidłowe"
        break
      case RequestErrors.PASSWORD_RESET_REQUEST_EXIST:
        message =
          "Na podany adres email została już wysłana prośba zresetowania hasła. Sprawdz skrzynkę email. Mail może przyjść po paru minutach i znajdować się w folderze spam."
        break
      case RequestErrors.OUTDATED_TOKEN:
        message = "Twój link służący do zresetowania hasła stracił ważność."
        break
      case RequestErrors.IS_USED_TOKEN:
        message = "Twój link służacy do zresetowania hasła został już wykorzystany."
        break
      default:
        message = "Wystąpił problem, spróbuj jeszcze raz"
        break
    }
    setAlert({
      severity,
      message,
      isOpen: true,
    })
  }
  const handleClose = () => setAlert({ severity: null, message: "", isOpen: false })

  return { alert, handleOpen, handleClose }
}
