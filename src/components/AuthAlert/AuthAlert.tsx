import { AlertCircle, FileWarning, Terminal } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Severity } from "@/types/alert"

type Props = {
  variant?: Severity
  description: string
}

export const AuthAlert = ({ variant, description }: Props) => {
  return (
    <Alert variant={variant}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Błąd</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}
