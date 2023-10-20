"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Errors } from "@/types/errors-dictionary"
import { yupResolver } from "@hookform/resolvers/yup"
import { DialogClose } from "@radix-ui/react-dialog"
import format from "date-fns/format"
import pl from "date-fns/locale/pl"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

export const visitFormSchema = yup.object({
  date: yup.date().required(Errors.EMPTY_FIELD).typeError(Errors.INCORRECT_DATE),
  doctor: yup.string().required(Errors.EMPTY_FIELD),
  description: yup.string().required(Errors.EMPTY_FIELD),
})
type VisitFormData = yup.InferType<typeof visitFormSchema>

export const VisitForm = () => {
  const form = useForm({
    resolver: yupResolver(visitFormSchema),
    defaultValues: { date: undefined, doctor: "", description: "" },
  })

  const onSubmit = (formData: VisitFormData) => {
    console.log(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="doctor"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Lekarz *</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz z listy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Joanna</SelectItem>
                      <SelectItem value="banana">Piotr</SelectItem>
                      <SelectItem value="blueberry">Aleksandra</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data wizyty *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zalecenia</FormLabel>
                <FormControl>
                  <Textarea
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Dodaj wizyte</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  )
}
