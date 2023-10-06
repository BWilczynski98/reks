import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { formatPhoneNumber, formatPostalCode } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import type { AnimalFormData } from "./schema"

type TypeListOfTemporaryHomes = TemporaryHomeType[] | undefined

type TypeFormItemsContainer = {
  children: React.ReactNode
}

type TypeTemporaryHomeList = {
  form: UseFormReturn<AnimalFormData>
  listOfTemporaryHomes: TypeListOfTemporaryHomes
}

type TypeTemporaryHomeForm = {
  form: UseFormReturn<AnimalFormData>
}

type TypeTemporaryHomeComponent = {
  form: UseFormReturn<AnimalFormData>
  listOfTemporaryHomes: TypeListOfTemporaryHomes
}

const FormItemsContainer = ({ children }: TypeFormItemsContainer) => {
  return <div className="flex max-sm:flex-col sm:flex-row max-sm:space-y-2 sm:space-x-2">{children}</div>
}

const TemporaryHomeList = ({ listOfTemporaryHomes, form }: TypeTemporaryHomeList) => {
  const listIsEmpty = !listOfTemporaryHomes?.length
  return (
    <>
      <FormField
        control={form.control}
        name="firstNameTemporaryHome"
        render={({ field }) => (
          <FormItem>
            <Select
              disabled={listIsEmpty}
              defaultValue={field.value}
              onValueChange={(value) => {
                const home = listOfTemporaryHomes?.find((home) => home.id === value)

                if (home) {
                  const nameplate = home.owner.split(" ")
                  const addressSplit = home.street.split(" ")
                  const numberOfAddressSplit = addressSplit[1].split("/")
                  const firstName = nameplate[0]
                  const lastName = nameplate[1]
                  const streetName = addressSplit[0]
                  const buildNumber = numberOfAddressSplit[0]
                  const apartmentNumber = numberOfAddressSplit[1]

                  form.setValue("firstNameTemporaryHome", firstName)
                  form.setValue("lastNameTemporaryHome", lastName)
                  form.setValue("phoneNumberTemporaryHome", home.phoneNumber)
                  form.setValue("streetTemporaryHome", streetName)
                  form.setValue("buildingNumberTemporaryHome", buildNumber)
                  form.setValue("apartmentNumberTemporaryHome", apartmentNumber)
                  form.setValue("cityTemporaryHome", home?.city)
                  form.setValue("postalCodeTemporaryHome", home?.postalCode)
                }
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz z listy dom tymczasowy" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {listOfTemporaryHomes?.map((house, i) => {
                  return (
                    <SelectItem
                      value={house.id.toString()}
                      key={i}
                    >
                      <div>
                        <div className="font-semibold">{house.owner}</div>
                        <div>{house.street}</div>
                        <div>
                          {formatPostalCode(house.postalCode)}&nbsp;{house.city}
                        </div>
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            {listIsEmpty ? <FormDescription>Lista domów tymczasowych jest pusta.</FormDescription> : null}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

export const TemporaryHomeForm = ({ form }: TypeTemporaryHomeForm) => {
  return (
    <>
      <FormItemsContainer>
        <FormField
          control={form.control}
          name="firstNameTemporaryHome"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Imię *</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-off"
                  required
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastNameTemporaryHome"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nazwisko *</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-off"
                  required
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </FormItemsContainer>
      <FormItemsContainer>
        <FormField
          control={form.control}
          name="phoneNumberTemporaryHome"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Numer telefonu *</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-off"
                  required
                  maxLength={9}
                  inputMode="numeric"
                  pattern="[-0-9]*"
                  type="text"
                  {...field}
                  value={formatPhoneNumber(field.value as string)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="streetTemporaryHome"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Ulica *</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-off"
                  required
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </FormItemsContainer>
      <FormItemsContainer>
        <FormField
          control={form.control}
          name="buildingNumberTemporaryHome"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Numer budynku *</FormLabel>
              <FormControl>
                <Input
                  required
                  autoComplete="new-off"
                  maxLength={4}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apartmentNumberTemporaryHome"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Numer mieszkania</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-off"
                  maxLength={4}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </FormItemsContainer>
      <FormItemsContainer>
        <FormField
          control={form.control}
          name="cityTemporaryHome"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Miasto *</FormLabel>
              <FormControl>
                <Input
                  required
                  autoComplete="new-off"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCodeTemporaryHome"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Kod pocztowy *</FormLabel>
              <FormControl>
                <Input
                  required
                  autoComplete="new-off"
                  maxLength={6}
                  {...field}
                  value={formatPostalCode(field.value ? field.value : "")}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </FormItemsContainer>
    </>
  )
}

export const TemporaryHome = ({ listOfTemporaryHomes, form }: TypeTemporaryHomeComponent) => {
  const [showList, setShowList] = useState(true)

  useEffect(() => {
    form.resetField("lastNameTemporaryHome")
    form.resetField("firstNameTemporaryHome")
    form.resetField("phoneNumberTemporaryHome")
    form.resetField("streetTemporaryHome")
    form.resetField("buildingNumberTemporaryHome")
    form.resetField("apartmentNumberTemporaryHome")
    form.resetField("cityTemporaryHome")
    form.resetField("postalCodeTemporaryHome")
  }, [showList])

  return (
    <div className="bg-zinc-50/50 dark:bg-zinc-900 rounded-xl p-4 space-y-4">
      <p className="text-lg font-semibold">Dom tymczasowy</p>
      {showList ? (
        <>
          <TemporaryHomeList
            listOfTemporaryHomes={listOfTemporaryHomes}
            form={form}
          />
        </>
      ) : (
        <TemporaryHomeForm form={form} />
      )}
      <div className="flex justify-center">
        <Button
          // className="w-full"
          variant={"secondary"}
          type="button"
          onClick={() => {
            setShowList((prev) => !prev)
          }}
        >
          {showList ? "Stwórz nowy" : "Wybierz z listy"}
        </Button>
      </div>
    </div>
  )
}
