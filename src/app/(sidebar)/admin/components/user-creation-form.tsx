"use client"
import { AuthAlert } from "@/components"
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAlert } from "@/hooks"
import { useCreateUserMutation, useGetListOfUsersQuery } from "@/redux/services/userApi"
import { Severity } from "@/types/alert"
import { Errors } from "@/types/errors-dictionary"
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const { toast } = useToast()
  const [createUser, { isLoading, isError }] = useCreateUserMutation()
  const { refetch: refetchListOfUsers } = useGetListOfUsersQuery()

  const [userEmailAddress, setUserEmailAddress] = useState("")
  const { alert, handleOpen: handleOpenAlert, handleClose: handleCloseAlert } = useAlert()

  function onSubmit(formData: FormData) {
    if (formData.email) {
      const email = form.getValues("email")
      setUserEmailAddress(email)
      setShowDeleteDialog(true)
    }
  }

  const sendEmail = async () => {
    await createUser({ email: userEmailAddress })
      .unwrap()
      .then(() => {
        toast({
          description: `Wysłano link aktywacyjny na adres email ${userEmailAddress}.`,
        })
        refetchListOfUsers()
        form.resetField("email")
      })
      .catch((err) => {
        handleOpenAlert({ severity: Severity.DESTRUCTIVE, data: err.data })
        toast({
          description: "Coś poszło nie tak, spróbuj jeszcze raz",
        })
      })
      .finally(() => {
        setShowDeleteDialog(false)
      })
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-sm"
          autoComplete="off"
        >
          {isError ? (
            <AuthAlert
              variant={alert.severity}
              description={alert.message}
            />
          ) : null}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adres email</FormLabel>
                <FormControl>
                  <Input
                    required
                    type="email"
                    placeholder="adres@email.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Na podany adres email, zostanie wysłany link pozwalający użytkownikowi zarejestrować się do aplikacji.
                </FormDescription>
              </FormItem>
            )}
          />
          <div>
            <Button type="submit">Stwórz konto</Button>
          </div>
        </form>
      </Form>
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Czy na pewno chcesz wysłać link aktywacyjny?</AlertDialogTitle>
            <AlertDialogDescription>
              Potwierdzając wysyłasz link umożliwiający rejestracje konta w aplikacji. Link zostanie wysłany na
              konto&nbsp;<span className="font-bold">{userEmailAddress}</span>.
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
