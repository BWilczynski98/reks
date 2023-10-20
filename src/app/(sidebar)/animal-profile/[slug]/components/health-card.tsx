import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { VisitForm } from "./visit-form"

export const HealthCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Karta zdrowia</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Dodaj wizyte</Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Formularz wizyty</DialogTitle>
            </DialogHeader>
            <VisitForm />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
