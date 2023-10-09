"use client"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useCreateAnimalMutation } from "@/redux/services/animalApi"
import { useCreateUserMutation, useGetListOfUsersQuery } from "@/redux/services/userApi"
import { Errors } from "@/types/errorsDictionary"
import { yupResolver } from "@hookform/resolvers/yup"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

const schema = yup.object({
  email: yup
    .string()
    .lowercase(Errors.LOWERCASE_EMAIL)
    .strict()
    .email(Errors.INCORRECT_EMAIL)
    .required(Errors.EMPTY_FIELD),
})
type FormData = yup.InferType<typeof schema>

export const UserCreationForm = () => {
  const form = useForm<FormData>({ resolver: yupResolver(schema), defaultValues: { email: "" } })
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { toast } = useToast()
  const [createUser] = useCreateUserMutation()
  const { refetch: refetchListOfUsers } = useGetListOfUsersQuery()

  function onSubmit(formData: FormData) {
    if (formData.email) {
      setShowDeleteDialog(true)
    }
  }

  const sendEmail = async () => {
    const userEmailAddress = await form.getValues("email")
    await setIsLoading(true)
    await createUser({ email: userEmailAddress })
      .unwrap()
      .then(() => {
        toast({
          description: `Wysłano link aktywacyjny na adres email ${userEmailAddress}.`,
        })
        refetchListOfUsers()
        form.resetField("email")
      })
      .catch((err) =>
        toast({
          description: "Coś poszło nie tak, spróbuj jeszcze raz",
        })
      )
      .finally(() => {
        setShowDeleteDialog(false)
        setIsLoading(false)
      })
  }

  return (
    <>
      <Card className="w-2/5">
        <CardHeader>
          <CardTitle>Zarejestruj konto użytkownika</CardTitle>
          <CardDescription>
            Ten formularz pozwala utworzyć konto użytkownika. Wypełnij pole adresem email na który zostanie przesłany
            link, dzięki któremu użytkownik będzie mógł zarejestrować się do aplikacji.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
              autoComplete="off"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="email"
                        placeholder="adres@email.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div>
                <Button
                  className="order-first md:order-last w-full"
                  type="submit"
                >
                  Stwórz konto
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz usunąć profil zwierzęcia?</AlertDialogTitle>
            <AlertDialogDescription>
              Potwierdzając usuniesz profil&nbsp;<span className="font-bold"></span>, tej czynności nie można cofnąć.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <Button
              onClick={sendEmail}
              disabled={isLoading}
            >
              {" "}
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wysyłanie
                </>
              ) : (
                "Wyślij maila"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
