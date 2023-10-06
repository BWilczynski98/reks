import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn, formatPostalCode } from "@/lib/utils"
import { AnimalResidence } from "@/types/animal"
import format from "date-fns/format"
import pl from "date-fns/locale/pl"
import { CalendarIcon } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import type { AnimalFormData } from "./schema"

type TypeLocationInformation = {
  form: UseFormReturn<AnimalFormData>
}

export const LocationInformation = ({ form }: TypeLocationInformation) => {
  return (
    <>
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
          <div className="flex flex-col gap-2 md:flex-row md:justify-between">
            <FormField
              control={form.control}
              name="cityWhereFound"
              render={({ field }) => (
                <FormItem className="w-full md:w-2/3">
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
                <FormItem className="w-full md:w-1/3">
                  <FormControl>
                    <Input
                      autoComplete="new-off"
                      required
                      placeholder="Kod pocztowy"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      type="text"
                      {...field}
                      value={formatPostalCode(field.value as string)}
                      maxLength={5}
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
                  disabled={(date) =>
                    date > new Date() || new Date(form.getValues("birthDate")) > date || date < new Date("1900-01-01")
                  }
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
                <SelectItem value={AnimalResidence.BASE}>{AnimalResidence.BASE}</SelectItem>
                <SelectItem value={AnimalResidence.TEMPORARY_HOME}>{AnimalResidence.TEMPORARY_HOME}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
