"use client"

import { addAnimal } from "@/actions/addAnimal"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useDisclose } from "@/hooks"
import { cn, formatPostalCode } from "@/lib/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { format } from "date-fns"
import { pl } from "date-fns/locale"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { AnimalFormData, animalFormSchema } from "./schema"

export function AnimalForm() {
  const form = useForm<AnimalFormData>({
    resolver: yupResolver(animalFormSchema),
    defaultValues: {
      photo: "",
      name: "",
      genre: "",
      gender: "",
      birthDate: undefined,
      streetWhereFound: "",
      cityWhereFound: "",
      postalCodeWhereFound: "",
      dateOfSecurity: undefined,
      residence: "",
      stateOfHealth: "",
    },
  })

  const { state: isLoading, handleOpen: handleStartLoading, handleClose: handleStopLoading } = useDisclose()
  const router = useRouter()
  const session = useSession()
  const userId = session.data?.user.id

  async function onSubmit(formData: AnimalFormData) {
    await handleStartLoading()
    await addAnimal(formData, userId as string)
      .then(() => {
        // router.push(Routes.DASHBOARD)
      })
      .catch((err) => console.log(err))
      .finally(() => handleStopLoading())
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formularz nowego podopiecznego</CardTitle>
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
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zdjęcie</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Reks"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię *</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-off"
                      required
                      placeholder="Reks"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Gatunek *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cat" />
                        </FormControl>
                        <FormLabel className="font-normal">Kot</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="dog" />
                        </FormControl>
                        <FormLabel className="font-normal">Pies</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Płeć *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">Samica</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">Samiec</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data urodzenia *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP", { locale: pl }) : <span>Wybierz date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div className="mb-2">
                <Label>Miejsce złapania *</Label>
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="streetWhereFound"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoComplete="new-off"
                          required
                          placeholder="Ulica"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between gap-2">
                  <FormField
                    control={form.control}
                    name="cityWhereFound"
                    render={({ field }) => (
                      <FormItem className="w-2/3">
                        <FormControl>
                          <Input
                            required
                            placeholder="Miasto"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postalCodeWhereFound"
                    render={({ field }) => (
                      <FormItem className="w-1/3">
                        <FormControl>
                          <Input
                            required
                            placeholder="Kod pocztowy"
                            value={formatPostalCode(field.value)}
                            onChange={field.onChange}
                            // {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="dateOfSecurity"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Data zabezpieczenia *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP", { locale: pl }) : <span>Wybierz date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="residence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gdzie przebywa *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    required
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz miejsce gdzie przebywa zwierze" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="base">Siedziba</SelectItem>
                      <SelectItem value="temporary home">Dom tymczasowy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stateOfHealth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stan zdrowia</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Opisz stan zdrowia zwierzęcia w dniu przyjęcia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end space-x-6">
              <Button
                variant={"outline"}
                type="button"
                asChild
              >
                <Link href="/">Anuluj</Link>
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Tworzenie
                  </>
                ) : (
                  "Stwórz"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
